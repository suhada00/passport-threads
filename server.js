const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

// Middlewares
app.use(cors());
app.use(express.json());

// In-Memory Rate Limiting (Simple cache)
const rateLimitCache = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(req, res, next) {
  const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip;
  const now = Date.now();
  
  if (!rateLimitCache.has(ip)) {
    rateLimitCache.set(ip, []);
  }
  
  const timestamps = rateLimitCache.get(ip).filter(ts => now - ts < RATE_LIMIT_WINDOW);
  timestamps.push(now);
  rateLimitCache.set(ip, timestamps);
  
  if (timestamps.length > RATE_LIMIT_MAX) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a minute before trying again.',
      code: 'RATE_LIMITED',
      retryAfter: Math.round(RATE_LIMIT_WINDOW / 1000)
    });
  }
  next();
}

// Persist stats and data cache in a simple JSON file
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const publicDir = fs.existsSync(path.join(__dirname, 'public'))
  ? path.join(__dirname, 'public')
  : __dirname;

// Ensure data folder exists
if (!fs.existsSync(path.dirname(DB_PATH))) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

let db = { total_passports: 1284, cache: {} };
if (fs.existsSync(DB_PATH)) {
  try {
    db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch (err) {
    console.error('Error loading db.json, using default:', err);
  }
}

function saveDB() {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

// ── Web Scraper Helpers ──
function decodeHTMLEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g,  '&')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function extractOGTag(html, property) {
  let m = html.match(new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i')) || 
          html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'));
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
      const cleanScript = script.replace(/<\/?script[^>]*>/gi, '');
      const data = JSON.parse(cleanScript);
      if (data && Array.isArray(data.itemListElement)) {
        data.itemListElement.forEach(item => {
          if (item.name) posts.push(item.name.substring(0, 280));
        });
      }
    } catch (e) {}
  }
  return posts;
}

function sanitizeUsername(u) {
  return (u || '').replace(/^@/, '').trim().toLowerCase().replace(/[^a-z0-9._]/g, '');
}

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
      } catch (err) {}
    }
  }
  return null;
}

// ── Mock Passport Generator (Fallback) ──
function generateMockPassport(username, lang = 'en', manualBio = null) {
  const usernameClean = sanitizeUsername(username) || 'wanderer';
  const hash = crypto.createHash('md5').update(usernameClean).digest('hex');
  const hInts = [];
  for (let i = 0; i < hash.length; i += 2) {
    hInts.push(parseInt(hash.substring(i, i + 2), 16));
  }
  
  let nations, titles, taglines, allStamps, bioSummaries;
  if (lang === 'id') {
    nations = [
      "Republik Debat Kusir", "Kerajaan Midnight Posting", "Federasi Thread Gantung",
      "Warga Online Kronis", "Republik Curhat Berlebihan", "Serikat Konten Adem Ayem",
      "Republik Repost Demokratis", "Suku Pengamat Hening", "Kekaisaran Sindiran Halus",
      "Tanah Drama Kutipan", "Negara Bebas Draf Abadi", "Perserikatan Pendapat Tanpa Diminta",
      "Kesultanan Lurker", "Keadipatim Algoritma Umpan Klik"
    ];
    titles = [
      "Kepala Bagian Galau Malam", "Lurker Agung", "Arsitek Debat Kusir",
      "Jenderal Penguji Vibe", "Pembuat Utas Profesional", "Pawang Algoritma",
      "Shitposter Bersertifikat", "Penjelajah Linimasa", "Penimbun Draf Teks",
      "Seniman Sindiran", "Kolektor GIF Reaksi", "Diplomat Online Kronis"
    ];
    taglines = [
      "Posting ke ruang hampa. Hampa menghargainya.", "Di sini untuk seru-seruan, bukan thread panjang.",
      "Draf saya lebih bagus daripada postingan Anda.", "Online di dunia maya, offline di dunia nyata.",
      "Saya datang, saya melihat, saya mengutip.", "Ini bukan drama, ini komentar sosial.",
      "Sedang mengetik...", "Vibe terverifikasi, fakta masih pending."
    ];
    allStamps = [
      "Online Kronis", "Penyintas Scroll", "Penimbun Draf", "Pendeteksi Umpan",
      "Lencana Lurker", "Bandar Meme", "Raja Kutipan", "Ratu Kutipan",
      "Kecanduan Notif", "Master Vibe", "Posting Tengah Malam", "Pelopor Thread",
      "Kesayangan Algoritma"
    ];
    bioSummaries = [
      "Utamanya di sini hanya untuk menonton kekacauan sambil memegang draf.",
      "Legenda mengatakan mereka punya 500 draf dan tidak akan pernah diposting.",
      "Menghabiskan waktu 8 jam scroll dan 8 detik mengetik. Sangat efisien.",
      "Argumennya sangat panas sampai butuh sistem pendingin.",
      "Seorang lurker profesional yang sesekali merilis karya agung.",
      "Sendirian menjaga feed notifikasi tetap hidup.",
      "Sebuah teka-teki dalam bentuk utas. Scan profil AI mengonfirmasi 100% vibes."
    ];
  } else {
    nations = [
      "Republic of Hot Takes", "Kingdom of Midnight Posting", "Federation of Unfinished Threads",
      "Commonwealth of the Chronically Online", "People's Republic of Oversharing",
      "United States of Wholesome Content", "Democratic Republic of Reposters",
      "Silent Observer Nation", "Empire of Subtweet Energy", "Land of Quote Unquote Drama",
      "Free State of Perpetual Drafts", "Nation of Unsolicited Opinions",
      "Sultanate of Lurkers", "Archduchy of Algorithmic Bait"
    ];
    titles = [
      "Chief Midnight Thoughts Officer", "Lurker Supreme", "Hot Take Architect",
      "Vibe Checker General", "Professional Thread Spinner", "Algorithm Whisperer",
      "Certified Shitposter", "Serial Scroller", "Draft Collector",
      "Subtweet Artisan", "Reaction GIF Connoisseur", "Chronically Online Diplomat"
    ];
    taglines = [
      "Posts into the void. The void appreciated it.", "Here for a good time, not a long thread.",
      "My drafts are better than your posts.", "Chronically online, locally offline.",
      "I came, I saw, I quoted.", "It's not drama, it's commentary.",
      "Usually typing...", "Vibes check out, facts are pending."
    ];
    allStamps = [
      "Chronically Online", "Scroll Survivor", "Draft Hoarder", "Bait Detector",
      "Lurker Badge", "Meme Dealer", "Quote King", "Quote Queen",
      "Notification Addict", "Vibe Master", "Late Night Poster", "Thread Pioneer",
      "Algorithmic Sweetheart"
    ];
    bioSummaries = [
      "Mainly here to watch the chaos unfold while holding a draft.",
      "Legend says they have 500 drafts and none of them will ever see the light of day.",
      "Spends 8 hours scrolling and 8 seconds typing. Highly efficient.",
      "Their hot takes are so hot they need a cooling system.",
      "A professional lurker who occasionally drops a masterpiece.",
      "Single-handedly keeping the notification feeds alive.",
      "An enigma wrapped in a thread. AI profile scanning confirms 100% vibes."
    ];
  }
  
  const nation = nations[hInts[0] % nations.length];
  const title = titles[hInts[1] % titles.length];
  const tagline = taglines[hInts[2] % taglines.length];
  const bioSummary = bioSummaries[hInts[3] % bioSummaries.length];
  
  const selectedStamps = [];
  let stampIdx = 4;
  while (selectedStamps.length < 3 && stampIdx < hInts.length) {
    const stamp = allStamps[hInts[stampIdx] % allStamps.length];
    if (!selectedStamps.includes(stamp)) {
      selectedStamps.push(stamp);
    }
    stampIdx++;
  }
  while (selectedStamps.length < 3) {
    for (const stamp of allStamps) {
      if (!selectedStamps.includes(stamp)) {
        selectedStamps.push(stamp);
        break;
      }
    }
  }
  
  const scores = {
    asbun: 30 + (hInts[5] % 70),
    sinis: 30 + (hInts[6] % 70),
    wholesome: 30 + (hInts[7] % 70),
    chaos: 30 + (hInts[8] % 70),
    baper: 30 + (hInts[9] % 70),
    receh: 30 + (hInts[10] % 70),
    halu: 30 + (hInts[11] % 70),
    fomo: 30 + (hInts[12] % 70),
    caper: 30 + (hInts[13] % 70),
    healing: 30 + (hInts[14] % 70)
  };
  
  const passportChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passportNum = "PT" + Array.from({length: 7}, (_, i) => passportChars[hInts[(10 + i) % hInts.length] % passportChars.length]).join('');
  const displayName = username.replace(/_/g, ' ').replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${usernameClean}`;
  const bio = manualBio || `A distinguished citizen of the ${nation}. Often spotted sharing thoughts and checking vibes.`;
  
  const countries = ["US", "GB", "FR", "DE", "JP", "KR", "ID", "BR", "CA", "MX", "AU", "SG", "MY", "IN", "TR"];
  const detectedCountry = countries[hInts[12] % countries.length];
  
  return {
    title,
    nation,
    tagline,
    passportNumber: passportNum,
    country: detectedCountry,
    scores,
    stamps: selectedStamps,
    bio_summary: bioSummary
  };
}

// ── OpenRouter AI Prompt Builder ──
function buildSystemPrompt(lang) {
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
  const postsText = profile.recentPosts && profile.recentPosts.length > 0
    ? profile.recentPosts.map((p, i) => `${i+1}. "${p}"`).join('\n')
    : '(No visible posts — account may have limited public content)';

  const modeNote = profile.isManualMode
    ? '\n⚠️ NOTE: User provided this bio manually (account may be private). Base analysis primarily on their self-description.'
    : '';

  return `Analyze this Threads user and generate their passport:${modeNote}

USERNAME: @${profile.username}
DISPLAY NAME: ${profile.name}
BIO: ${profile.bio || '(empty bio)'}
FOLLOWERS: ${profile.followerCount || 'N/A'}
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
    title:    data.jabatan || data.title || 'Mysterious Thread Wanderer',
    nation:   data.nation || 'Republic of Internet Citizens',
    tagline:  data.tagline || 'Posts into the void. The void appreciates it.',
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

// ── OpenRouter API Call ──
async function generatePassportWithAI(profile, lang, country, apiKey) {
  const systemPrompt = buildSystemPrompt(lang);
  const userPrompt = buildUserPrompt(profile, lang, country);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://threadspassport.fun',
        'X-Title': 'Passport Threads v2'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-haiku-4.5',
        max_tokens: 500,
        temperature: 0.85,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' }
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`OpenRouter returned status ${res.status}`);
    }
    
    const data = await res.json();
    let content = data.choices?.[0]?.message?.content || '{}';
    content = content.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    const parsed = JSON.parse(content);
    return validateAndNormalizePassport(parsed);
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

// ── API ROUTES ──

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '2.0-node' });
});

app.get('/api/stats', (req, res) => {
  res.json({ total_passports: db.total_passports });
});

// /api/fetch-profile
app.post('/api/fetch-profile', checkRateLimit, async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });

  const clean = sanitizeUsername(username);
  if (!clean) return res.status(400).json({ error: 'Invalid username' });

  // Check db cache
  const cacheKey = `profile:${clean}`;
  if (db.cache[cacheKey]) {
    const cached = db.cache[cacheKey];
    // Cache for 15 minutes (900000 ms)
    if (Date.now() - cached.timestamp < 15 * 60 * 1000) {
      return res.json(cached.data);
    }
  }

  // Fetch from Threads
  let output = null;
  try {
    const threadRes = await fetch(`https://www.threads.net/@${clean}`);

    if (threadRes.ok) {
      const html = await threadRes.text();
      const isPrivate = html.includes('This account is private') || html.includes('Akun ini privat');

      if (!isPrivate) {
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

        if (!finalProfilePicUrl || !finalBio || !finalDisplayName) {
          const embedded = extractFromEmbeddedJSON(html);
          if (embedded) {
            source = "embedded_json";
            if (embedded.displayName) finalDisplayName = embedded.displayName;
            if (embedded.profilePicUrl) finalProfilePicUrl = embedded.profilePicUrl;
            if (embedded.bio) finalBio = embedded.bio;
          }
        }

        if (finalDisplayName || finalProfilePicUrl) {
          output = {
            status: "success",
            username: clean,
            displayName: finalDisplayName || clean.replace(/_/g, ' ').replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            profilePicUrl: finalProfilePicUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${clean}`,
            bio: finalBio || "An active citizen of the Threads universe.",
            recentPostsText: recentPostsText.length > 0 ? recentPostsText : ["Let's spin some threads!", "Checking out the vibes!"],
            source: source
          };
        }
      }
    }
  } catch (err) {
    console.error('Fetch profile execution error (falling back):', err);
  }

  // If scraping failed or was blocked, generate fallback profile automatically
  if (!output) {
    output = {
      status: "success",
      username: clean,
      displayName: clean.replace(/_/g, ' ').replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      profilePicUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${clean}`,
      bio: "An active citizen of the Threads universe. Profile details generated via server backup.",
      recentPostsText: [
        "Just checking out my new satirical passport!",
        "Honestly, the local environment is so fast.",
        "Let's spin some threads!"
      ],
      source: "fallback"
    };
  }

  // Save cache
  db.cache[cacheKey] = {
    timestamp: Date.now(),
    data: output
  };
  saveDB();

  res.json(output);
});

// /api/analyze-profile
app.post('/api/analyze-profile', checkRateLimit, async (req, res) => {
  const { username, displayName, profilePicUrl, bio, recentPostsText = [], lang = 'id', manualBio = null } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });

  const clean = sanitizeUsername(username);

  // Check cache
  const cacheKey = `analysis:${clean}:${lang}`;
  if (db.cache[cacheKey]) {
    const cached = db.cache[cacheKey];
    // Cache for 1 hour (3600000 ms)
    if (Date.now() - cached.timestamp < 60 * 60 * 1000) {
      // Increment passport count
      db.total_passports += 1;
      saveDB();
      return res.json(cached.data);
    }
  }

  const profileData = {
    username: clean,
    name: displayName || clean,
    avatar: profilePicUrl,
    bio: manualBio || bio || '',
    recentPosts: recentPostsText,
    isManualMode: !!manualBio
  };

  const country = req.headers['cf-ipcountry'] || 'US';

  // Increment total passports
  db.total_passports += 1;
  saveDB();

  // If OpenRouter key is set, use AI. Otherwise, use mock.
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (apiKey && apiKey !== 'YOUR_OPENROUTER_API_KEY_HERE') {
    try {
      const passportData = await generatePassportWithAI(profileData, lang, country, apiKey);
      const output = {
        success: true,
        profile: profileData,
        passport: passportData,
        country: passportData.country || country
      };
      // Save cache
      db.cache[cacheKey] = { timestamp: Date.now(), data: output };
      saveDB();
      return res.json(output);
    } catch (err) {
      console.error('OpenRouter AI call failed, falling back to mock:', err);
    }
  }

  // Fallback / Mock mode
  const passportData = generateMockPassport(clean, lang, manualBio);
  const output = {
    success: true,
    profile: profileData,
    passport: passportData,
    country: passportData.country || country
  };

  // Cache mock response
  db.cache[cacheKey] = { timestamp: Date.now(), data: output };
  saveDB();

  res.json(output);
});

// /api/image-proxy
app.get('/api/image-proxy', async (req, res) => {
  const targetUrlStr = req.query.url;
  if (!targetUrlStr) {
    return res.status(400).json({ error: 'URL parameter required' });
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
      return res.status(403).json({ error: 'Domain not whitelisted' });
    }

    const imgRes = await fetch(targetUrlStr, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!imgRes.ok) {
      return res.status(imgRes.status).json({ error: 'Failed to fetch target image' });
    }

    const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Pipe response body
    const arrayBuffer = await imgRes.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    res.status(400).json({ error: 'Invalid URL' });
  }
});

// Dynamic Open Graph handler for shared profile links
function handleDynamicIndex(req, res, next) {
  const username = req.query.u ? req.query.u.trim() : null;
  const lang = req.params.lang || 'en';
  
  let filePath = path.join(publicDir, 'index.html');
  if (lang !== 'en' && fs.existsSync(path.join(publicDir, 'lang', lang, 'index.html'))) {
    filePath = path.join(publicDir, 'lang', lang, 'index.html');
  }

  if (!username) {
    return res.sendFile(filePath);
  }

  const clean = sanitizeUsername(username);
  const cacheKeyID = `analysis:${clean}:id`;
  const cacheKeyEN = `analysis:${clean}:en`;
  const cachedData = db.cache[cacheKeyID] || db.cache[cacheKeyEN] || Object.keys(db.cache)
    .filter(k => k.startsWith(`analysis:${clean}:`))
    .map(k => db.cache[k])[0];

  if (!cachedData || !cachedData.data) {
    return res.sendFile(filePath);
  }

  const data = cachedData.data;
  const nation = data.passport.nation || 'Threads Nation';
  const title = data.passport.title || 'Citizen';

  fs.readFile(filePath, 'utf-8', (err, html) => {
    if (err) {
      return res.sendFile(filePath);
    }

    let shareTitle, shareDesc;
    if (lang === 'id') {
      shareTitle = `Paspor Threads @${clean} — ${title} 🛂`;
      shareDesc = `Saya berasal dari "${nation}" dengan gelar "${title}". Temukan paspor kepribadian Threads Anda secara gratis!`;
    } else {
      shareTitle = `Threads Passport for @${clean} — ${title} 🛂`;
      shareDesc = `I am from "${nation}" with the official title "${title}". Find out your Threads Nation and personality scores for free!`;
    }

    let modifiedHtml = html
      .replace(/<title>.*?<\/title>/i, `<title>${shareTitle}</title>`)
      .replace(/<meta property="og:title" content=".*?"/i, `<meta property="og:title" content="${shareTitle}"`)
      .replace(/<meta property="og:description" content=".*?"/i, `<meta property="og:description" content="${shareDesc}"`)
      .replace(/<meta property="og:url" content=".*?"/i, `<meta property="og:url" content="https://threadspassport.fun${req.originalUrl}"`)
      .replace(/<meta name="twitter:title" content=".*?"/i, `<meta name="twitter:title" content="${shareTitle}"`)
      .replace(/<meta name="twitter:description" content=".*?"/i, `<meta name="twitter:description" content="${shareDesc}"`);

    res.send(modifiedHtml);
  });
}

app.get('/', handleDynamicIndex);
app.get('/lang/:lang/', handleDynamicIndex);

// Serve frontend static files
app.use(express.static(publicDir));

// Fallback all non-API routes to index.html for SPA behavior
app.get('*', (req, res) => {
  // If the path request is a static asset or path containing a dot, return 404
  if (req.path.includes('.')) {
    return res.status(404).send('Not found');
  }
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn('WARNING: process.env.OPENROUTER_API_KEY is not defined. Server is running in MOCK mode.');
  }
});
