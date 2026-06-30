/* _workers/passport-worker.js */
/* Cloudflare Worker — Backend scraper, rate limiter, image proxy, and OpenRouter AI gateway */

const CORS_HEADERS = (origin) => {
  const allowed = [
    'https://threadspassport.fun',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://localhost:8001',
    'http://127.0.0.1:8001',
    'http://localhost:9000',
    'http://127.0.0.1:9000',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ];
  const resOrigin = allowed.includes(origin) ? origin : 'https://threadspassport.fun';
  return {
    'Access-Control-Allow-Origin': resOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
};

// Rate Limiting Config
const RATE_LIMIT_MAX      = 5;    // max request per window per IP
const RATE_LIMIT_WINDOW   = 60;   // seconds
const AI_TIMEOUT_MS       = 15000; // 15 seconds max for AI response

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';

    // Handle Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS(origin) });
    }

    const url = new URL(request.url);
    const respond = (data, status = 200) =>
      new Response(JSON.stringify(data), { status, headers: CORS_HEADERS(origin) });

    try {
      switch (url.pathname) {
        case '/api/fetch-profile':
          if (request.method !== 'POST') return respond({ error: 'Method not allowed' }, 405);
          return await handleFetchProfile(request, env, ctx, respond);

        case '/api/analyze-profile':
          if (request.method !== 'POST') return respond({ error: 'Method not allowed' }, 405);
          return await handleAnalyzeProfile(request, env, ctx, respond);

        case '/api/image-proxy':
          if (request.method !== 'GET') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
              status: 405,
              headers: CORS_HEADERS(origin)
            });
          }
          return await handleImageProxy(request, env, origin);

        case '/api/stats':
          return await handleStats(env, respond);

        case '/api/health':
          return respond({ status: 'ok', version: '2.0' });

        default:
          return respond({ error: 'Not found' }, 404);
      }
    } catch (err) {
      console.error('Worker error:', err);
      return respond({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, 500);
    }
  }
};

// ── ROUTE: /api/fetch-profile ──
// Scraping endpoint with KV Cache & rate limits
async function handleFetchProfile(request, env, ctx, respond) {
  const body = await request.json();
  const { username } = body;
  if (!username) return respond({ error: 'Username required' }, 400);

  const clean = sanitizeUsername(username);
  if (!clean) return respond({ error: 'Invalid username' }, 400);

  // Rate Limiting Check
  const clientIP = request.headers.get('CF-Connecting-IP')
    || request.headers.get('X-Forwarded-For')
    || 'unknown';
  const rlKey = `rl:fetch:${clientIP}`;
  let rlCount = 0;
  try {
    rlCount = parseInt(await env.KV.get(rlKey) || '0');
  } catch (err) {
    console.error('KV Read Error for rate limiting:', err);
  }

  if (rlCount >= RATE_LIMIT_MAX) {
    return respond({
      error: 'Too many requests. Please wait a minute before trying again.',
      code: 'RATE_LIMITED',
      retryAfter: RATE_LIMIT_WINDOW
    }, 429);
  }
  ctx.waitUntil(incrementCounter(env, rlKey, rlCount));

  // Check KV Profile Cache (10-15 minute TTL)
  const cacheKey = `profile:${clean}`;
  try {
    const cached = await env.KV.get(cacheKey);
    if (cached) {
      return respond(JSON.parse(cached));
    }
  } catch (err) {
    console.error('KV Read Error for profile cache:', err);
  }

  // Fetch from Threads
  try {
    const res = await fetch(`https://www.threads.net/@${clean}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    if (!res.ok) {
      return respond({ error: 'Profile not found', code: 'PROFILE_NOT_FOUND' }, 404);
    }

    const html = await res.text();

    // Check private account indicators
    if (html.includes('This account is private') || html.includes('Akun ini privat')) {
      return respond({ error: 'Profile is private', code: 'PROFILE_PRIVATE' }, 403);
    }

    // 1. Primary: Open Graph tags
    let displayName = extractOGTag(html, 'og:title')?.replace(' on Threads', '').trim() || null;
    if (displayName) {
      const match = displayName.match(/^([^\(]+)\s+\(@/);
      if (match) displayName = match[1].trim();
    }
    const profilePicUrl = extractOGTag(html, 'og:image') || null;
    const bio = extractOGTag(html, 'og:description') || null;
    const recentPostsText = extractPosts(html).slice(0, 8);

    let source = "og_tags";
    let finalDisplayName = displayName;
    let finalProfilePicUrl = profilePicUrl;
    let finalBio = bio;

    // 2. Fallback: Embedded JSON script tags
    if (!finalProfilePicUrl || !finalBio || !finalDisplayName) {
      const embedded = extractFromEmbeddedJSON(html);
      if (embedded) {
        source = "embedded_json";
        if (embedded.displayName) finalDisplayName = embedded.displayName;
        if (embedded.profilePicUrl) finalProfilePicUrl = embedded.profilePicUrl;
        if (embedded.bio) finalBio = embedded.bio;
      }
    }

    if (!finalDisplayName && !finalProfilePicUrl) {
      return respond({ error: 'Profile not found or is empty', code: 'PROFILE_NOT_FOUND' }, 404);
    }

    const output = {
      status: "success",
      username: clean,
      displayName: finalDisplayName,
      profilePicUrl: finalProfilePicUrl,
      bio: finalBio,
      recentPostsText: recentPostsText,
      source: source
    };

    // Save in KV cache (TTL 15 mins)
    ctx.waitUntil(env.KV.put(cacheKey, JSON.stringify(output), { expirationTtl: 900 }));

    return respond(output);
  } catch (err) {
    console.error('Fetch profile execution error:', err);
    return respond({ error: 'Internal server error while fetching profile', code: 'INTERNAL_ERROR' }, 500);
  }
}

// ── ROUTE: /api/analyze-profile ──
// AI Analysis processing endpoint
async function handleAnalyzeProfile(request, env, ctx, respond) {
  const body = await request.json();
  const { username, displayName, profilePicUrl, bio, recentPostsText = [], lang = 'id', manualBio = null } = body;
  
  if (!username) return respond({ error: 'Username required' }, 400);
  const clean = sanitizeUsername(username);

  // Check KV Analysis Cache (1 hour TTL)
  const cacheKey = `analysis:${clean}:${lang}`;
  try {
    const cached = await env.KV.get(cacheKey);
    if (cached) {
      return respond(JSON.parse(cached));
    }
  } catch (err) {
    console.error('KV Read Error for analysis cache:', err);
  }

  const profileData = {
    username: clean,
    name: displayName || clean,
    avatar: profilePicUrl,
    bio: manualBio || bio || '',
    recentPosts: recentPostsText,
    isManualMode: !!manualBio
  };

  const country = request.headers.get('CF-IPCountry') || 'US';
  try {
    const passportData = await generatePassportWithAI(
      profileData, lang, country, env.OPENROUTER_API_KEY
    );

    const output = {
      success: true,
      profile: profileData,
      passport: passportData,
      country: passportData.country || country
    };

    // Save in KV cache (TTL 1 hour)
    ctx.waitUntil(env.KV.put(cacheKey, JSON.stringify(output), { expirationTtl: 3600 }));

    return respond(output);
  } catch (err) {
    console.error('AI analysis error:', err);
    return respond({ error: 'Failed to analyze profile', code: 'ANALYSIS_ERROR' }, 500);
  }
}

// ── ROUTE: /api/image-proxy ──
// Whitelisted image proxy to prevent canvas taints
async function handleImageProxy(request, env, origin) {
  const urlObj = new URL(request.url);
  const targetUrlStr = urlObj.searchParams.get('url');
  
  if (!targetUrlStr) {
    return new Response(JSON.stringify({ error: 'URL parameter required' }), {
      status: 400,
      headers: CORS_HEADERS(origin)
    });
  }

  try {
    const targetUrl = new URL(targetUrlStr);
    const hostname = targetUrl.hostname.toLowerCase();
    
    // Whitelist domains matching *.cdninstagram.com, *.fbcdn.net, *.threads.net, *.instagram.com
    const isWhitelisted = hostname.endsWith('.cdninstagram.com') ||
                          hostname.endsWith('.fbcdn.net') ||
                          hostname.endsWith('.threads.net') ||
                          hostname.endsWith('.instagram.com') ||
                          hostname === 'threads.net' ||
                          hostname === 'instagram.com';
                          
    if (!isWhitelisted) {
      return new Response(JSON.stringify({ error: 'Domain not whitelisted' }), {
        status: 403,
        headers: CORS_HEADERS(origin)
      });
    }

    const imgRes = await fetch(targetUrlStr, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!imgRes.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch target image' }), {
        status: imgRes.status,
        headers: CORS_HEADERS(origin)
      });
    }

    const contentType = imgRes.headers.get('Content-Type') || 'image/jpeg';
    
    const headers = CORS_HEADERS(origin);
    headers['Content-Type'] = contentType;
    headers['Cache-Control'] = 'public, max-age=86400'; // Cache for 1 day

    return new Response(imgRes.body, {
      status: 200,
      headers: headers
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid URL' }), {
      status: 400,
      headers: CORS_HEADERS(origin)
    });
  }
}

// ── Web Scraper Helpers ──
async function fetchBasicProfile(username) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`https://www.threads.net/@${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const html = await res.text();

    const name   = extractOGTag(html, 'og:title')?.replace(' on Threads', '').trim() || username;
    const avatar = extractOGTag(html, 'og:image') || null;

    if (!name && !avatar) return null;
    return { username, name, avatar };
  } catch (err) {
    console.error('fetchBasicProfile error:', err);
    return null;
  }
}

async function fetchFullProfile(username) {
  const basic = await fetchBasicProfile(username);
  if (!basic) return null;

  try {
    const res = await fetch(`https://www.threads.net/@${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html',
      }
    });
    const html = await res.text();

    return {
      ...basic,
      bio:           extractOGTag(html, 'og:description') || '',
      followerCount: extractFollowers(html),
      recentPosts:   extractPosts(html).slice(0, 8),
      isManualMode:  false
    };
  } catch (err) {
    console.error('fetchFullProfile error:', err);
    return { ...basic, bio: '', followerCount: 'N/A', recentPosts: [], isManualMode: false };
  }
}

function extractOGTag(html, property) {
  const m = html.match(new RegExp(
    `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'
  )) || html.match(new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'
  ));
  return m ? decodeHTMLEntities(m[1]) : null;
}

function extractFollowers(html) {
  const m = html.match(/(\d[\d,.]*[KMB]?)\s*(?:followers|pengikut)/i);
  return m ? m[1] : 'N/A';
}

function extractPosts(html) {
  const ldm = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  const posts = [];
  for (const script of ldm) {
    try {
      const data = JSON.parse(script.replace(/<\/?script[^>]*>/gi, ''));
      if (Array.isArray(data.itemListElement)) {
        data.itemListElement.forEach(item => {
          if (item.name) posts.push(item.name.substring(0, 280));
        });
      }
    } catch {}
  }
  return posts;
}

function decodeHTMLEntities(str) {
  return str
    .replace(/&amp;/g,  '&')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'")
    .replace(/&nbsp;/g, ' ');
}

function sanitizeUsername(u) {
  return (u || '').replace(/^@/, '').trim().toLowerCase().replace(/[^a-z0-9._]/g, '');
}

// Traverses object recursively to find keys
function findKeysInObject(obj, keys) {
  const result = {};
  function traverse(o) {
    if (!o || typeof o !== 'object') return;
    for (const k in o) {
      if (keys.includes(k) && typeof o[k] === 'string') {
        result[k] = o[k];
      }
      traverse(o[k]);
    }
  }
  traverse(obj);
  return result;
}

// Fallback embedded JSON parser
function extractFromEmbeddedJSON(html) {
  const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/g) || [];
  for (const script of scripts) {
    const content = script.replace(/<\/?script[^>]*>/gi, '').trim();
    if (!content) continue;
    
    if (content.includes('biography') || content.includes('profile_pic_url') || content.includes('full_name')) {
      try {
        let data = {};
        if (script.includes('type="application/json"')) {
          data = JSON.parse(content);
        } else {
          const jsonMatch = content.match(/(\{[\s\S]*\})/);
          if (jsonMatch) {
            data = JSON.parse(jsonMatch[1]);
          }
        }
        
        const result = findKeysInObject(data, ['biography', 'profile_pic_url', 'full_name']);
        if (result.biography || result.profile_pic_url || result.full_name) {
          return {
            displayName: result.full_name || null,
            profilePicUrl: result.profile_pic_url || null,
            bio: result.biography || null
          };
        }
      } catch (err) {
        // Continue searching other script tags
      }
    }
  }
  return null;
}

// ── OpenRouter AI Connection ──
async function generatePassportWithAI(profile, lang, country, apiKey) {
  const systemPrompt = buildSystemPrompt(lang, country);
  const userPrompt   = buildUserPrompt(profile, lang, country);

  async function attemptCall(retryPrompt = null) {
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: userPrompt }
    ];
    if (retryPrompt) {
      messages.push({ role: 'user', content: retryPrompt });
    }

    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization':  `Bearer ${apiKey}`,
        'Content-Type':   'application/json',
        'HTTP-Referer':   'https://threadspassport.fun',
        'X-Title':        'Passport Threads v2'
      },
      body: JSON.stringify({
        model:       'anthropic/claude-haiku-4.5',
        max_tokens:  500,
        temperature: 0.85,
        messages: messages,
        response_format: { type: 'json_object' }
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`OpenRouter returned status ${res.status}`);
    const data    = await res.json();
    let content = data.choices?.[0]?.message?.content || '{}';
    
    // Strip JSON code fences
    content = content.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    return JSON.parse(content);
  }

  try {
    const parsed = await attemptCall();
    return validateAndNormalizePassport(parsed);
  } catch (err) {
    console.warn('AI call failed, retrying once with explicit JSON prompt:', err);
    try {
      const parsed = await attemptCall('PENTING: balas hanya JSON valid, tanpa teks tambahan.');
      return validateAndNormalizePassport(parsed);
    } catch (retryErr) {
      console.error('AI retry failed:', retryErr);
      return getFallbackPassport(profile.username);
    }
  }
}

function buildSystemPrompt(lang, country) {
  const langMap = {
    en: 'English', fr: 'French', de: 'German', es: 'Spanish',
    pt: 'Portuguese (Brazilian)', it: 'Italian', nl: 'Dutch',
    sv: 'Swedish', no: 'Norwegian', da: 'Danish', pl: 'Polish',
    tr: 'Turkish', ja: 'Japanese', ko: 'Korean', zh: 'Simplified Chinese',
    ar: 'Arabic', hi: 'Hindi', id: 'Indonesian'
  };

  const targetLang = langMap[lang] || 'Indonesian';

  return `You are a witty satirical analyst creating "Threads Passports" — official-looking satirical identity documents that reveal someone's Threads personality in a funny and relatable way.

Your output language: ${targetLang}

PERSONALITY RULES:
- Be funny, clever, and culturally aware.
- Avoid SARA, offensive, political, or sensitive content (AdSense safe).
- Keep it light, self-aware, and shareable.
- Make the "nation" creative and original — this is the viral element.
- Analyze the user's bio, posts, display name, and language to guess/detect which country they are from. For example: if they use Indonesian language, Indonesian words, or refer to Indonesian places, detect "ID". If they use Japanese, detect "JP". If they are from USA, detect "US", etc.

JSON SCHEMA:
{
  "jabatan": "satirical job title, funny and specific (e.g. 'Kepala Bagian Curhat Tengah Malam')",
  "keterangan": "one-line funny roast/summary explaining the job title and who they are",
  "nation": "Threads Nation name — creative, funny, specific to their personality (e.g. 'Republik Gabut', 'Kingdom of Midnight Posting')",
  "tagline": "one punchy funny line that captures their entire vibe",
  "passportNumber": "random alphanumeric exactly 9 chars (e.g. 'PT7X4K2M9')",
  "country": "detected 2-letter ISO country code of the user (e.g. 'ID', 'US', 'GB', 'JP', 'BR', 'ES', 'FR', 'DE', 'KR')",
  "scores": {
    "asbun": 0-100,
    "sinis": 0-100,
    "wholesome": 0-100,
    "chaos": 0-100,
    "baper": 0-100,
    "receh": 0-100,
    "halu": 0-100,
    "fomo": 0-100,
    "caper": 0-100,
    "healing": 0-100
  },
  "stamps": [
    "funny badge 1 (max 4 words)",
    "funny badge 2 (max 4 words)",
    "funny badge 3 (max 4 words)"
  ]
}`;
}

function buildUserPrompt(profile, lang, country) {
  const postsText = profile.recentPosts.length > 0
    ? profile.recentPosts.map((p, i) => `${i+1}. "${p}"`).join('\n')
    : '(No visible posts — account may have limited public content)';

  const modeNote = profile.isManualMode
    ? '\n⚠️ NOTE: User provided this bio manually (account may be private). Base analysis primarily on their self-description.'
    : '';

  return `Analyze this Threads user and generate their passport:${modeNote}

USERNAME: @${profile.username}
DISPLAY NAME: ${profile.name}
BIO: ${profile.bio || '(empty bio)'}
FOLLOWERS: ${profile.followerCount}
USER COUNTRY: ${country}
OUTPUT LANGUAGE: ${lang}

RECENT POSTS (the most important signal for personality analysis):
${postsText}

Based on the above, create a satirical Threads Passport that feels personally accurate and funny.
The "nation" must feel SPECIFIC to this person, not generic.
If bio and posts are minimal, be creative but honest about the mystery.`;
}

function validateAndNormalizePassport(data) {
  const clamp = (v, min = 0, max = 100) => Math.min(max, Math.max(min, parseInt(v) || 50));
  const genPN = () => 'PT' + Math.random().toString(36).substring(2, 9).toUpperCase();

  const scores = data.scores || {};

  return {
    title:    data.jabatan      || data.title || 'Mysterious Thread Wanderer',
    nation:   data.nation       || 'Republic of Internet Citizens',
    tagline:  data.tagline      || 'Posts into the void. The void appreciates it.',
    passportNumber: data.passportNumber || genPN(),
    country:  (data.country || 'US').toUpperCase().substring(0, 2),
    scores: {
      asbun:        clamp(scores.asbun),
      sinis:        clamp(scores.sinis),
      wholesome:    clamp(scores.wholesome),
      chaos:        clamp(scores.chaos),
      baper:        clamp(scores.baper),
      receh:        clamp(scores.receh),
      halu:         clamp(scores.halu),
      fomo:         clamp(scores.fomo),
      caper:        clamp(scores.caper),
      healing:      clamp(scores.healing),
    },
    stamps: Array.isArray(data.stamps) && data.stamps.length >= 3
      ? data.stamps.slice(0, 3)
      : ['Chronically Online', 'Thread Veteran', 'Scroll Survivor'],
    bio_summary: data.keterangan || data.bio_summary || 'A true citizen of the internet.'
  };
}

function getFallbackPassport(username) {
  return validateAndNormalizePassport({
    jabatan:    'Certified Internet Wanderer',
    nation:   'Republic of Loading States',
    tagline:  `@${username} exists on Threads. That says enough.`,
    passportNumber: 'PT' + Date.now().toString(36).toUpperCase().slice(-7),
    country:  'US',
    scores: { asbun: 50, sinis: 50, wholesome: 50, chaos: 50, baper: 50, receh: 50, halu: 50, fomo: 50, caper: 50, healing: 50 },
    stamps: ['Tried to Load', 'Still Waiting', 'Never Mind'],
    keterangan: 'The AI took a coffee break. This passport was issued by vibes alone.'
  });
}

async function incrementCounter(env, rlKey, currentRLCount) {
  try {
    const total = parseInt(await env.KV.get('total_passports') || '0');
    await env.KV.put('total_passports', String(total + 1));
    await env.KV.put(rlKey, String(currentRLCount + 1), { expirationTtl: 60 });
  } catch (err) {
    console.error('KV write error in incrementCounter:', err);
  }
}

async function handleStats(env, respond) {
  try {
    const total = parseInt(await env.KV.get('total_passports') || '0');
    return respond({ total_passports: total });
  } catch (err) {
    return respond({ total_passports: 0 });
  }
}
