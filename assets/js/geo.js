/* assets/js/geo.js */
/* Geolocation country detector with timezone mapping and API fallback */

async function detectUserCountry() {
  const timeoutMs = 3000;
  
  // 1. Try to fetch from ipapi.co JSON API with timeout abort controller
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (res.ok) {
      const data = await res.json();
      return {
        countryCode: data.country_code || 'US',
        countryName: data.country_name || 'United States'
      };
    }
  } catch (err) {
    console.warn('ipapi.co call failed or timed out. Falling back to timezone mapping:', err);
  }

  // 2. Guess country code based on the user's browser timezone
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) {
      if (tz.includes('Jakarta') || tz.includes('Asia/Pontianak') || tz.includes('Asia/Makassar')) {
        return { countryCode: 'ID', countryName: 'Indonesia' };
      }
      if (tz.includes('Seoul') || tz.includes('Asia/Seoul')) {
        return { countryCode: 'KR', countryName: 'Korea' };
      }
      if (tz.includes('Tokyo') || tz.includes('Asia/Tokyo')) {
        return { countryCode: 'JP', countryName: 'Japan' };
      }
      if (tz.includes('London') || tz.includes('Europe/London')) {
        return { countryCode: 'GB', countryName: 'United Kingdom' };
      }
      if (tz.includes('Paris') || tz.includes('Europe/Paris')) {
        return { countryCode: 'FR', countryName: 'France' };
      }
      if (tz.includes('Berlin') || tz.includes('Europe/Berlin')) {
        return { countryCode: 'DE', countryName: 'Germany' };
      }
      if (tz.includes('Sydney') || tz.includes('Australia/Sydney') || tz.includes('Melbourne')) {
        return { countryCode: 'AU', countryName: 'Australia' };
      }
      if (tz.includes('Brazil') || tz.includes('America/Sao_Paulo') || tz.includes('America/Rio_de_Janeiro')) {
        return { countryCode: 'BR', countryName: 'Brazil' };
      }
    }
  } catch (tzErr) {
    console.error('Timezone detection failed:', tzErr);
  }

  // 3. Absolute global fallback
  return { countryCode: 'US', countryName: 'United States' };
}

// Map country codes to passport themes / cover colors
const COUNTRY_THEMES = {
  US: { color: '#002868', accent: '#BF0A30', flag: '🇺🇸', passportStyle: 'americas' },
  CA: { color: '#BF0A30', accent: '#FFFFFF', flag: '🇨🇦', passportStyle: 'americas' },
  MX: { color: '#006341', accent: '#C8102E', flag: '🇲🇽', passportStyle: 'americas' },
  BR: { color: '#009739', accent: '#FFD100', flag: '🇧🇷', passportStyle: 'americas' },
  
  GB: { color: '#012169', accent: '#C8102E', flag: '🇬🇧', passportStyle: 'europe' },
  FR: { color: '#002395', accent: '#ED2939', flag: '🇫🇷', passportStyle: 'europe' },
  DE: { color: '#000000', accent: '#DD0000', flag: '🇩🇪', passportStyle: 'europe' },
  IT: { color: '#009246', accent: '#C1272D', flag: '🇮🇹', passportStyle: 'europe' },
  NL: { color: '#21468B', accent: '#AE1C28', flag: '🇳🇱', passportStyle: 'europe' },
  ES: { color: '#AD1519', accent: '#FFC400', flag: '🇪🇸', passportStyle: 'europe' },
  TR: { color: '#C8102E', accent: '#FFFFFF', flag: '🇹🇷', passportStyle: 'europe' },
  
  JP: { color: '#BC002D', accent: '#FFFFFF', flag: '🇯🇵', passportStyle: 'eastasia' },
  KR: { color: '#003478', accent: '#CD2E3A', flag: '🇰🇷', passportStyle: 'eastasia' },
  CN: { color: '#EE1C25', accent: '#FFFF00', flag: '🇨🇳', passportStyle: 'eastasia' },
  
  ID: { color: '#CE1126', accent: '#FFFFFF', flag: '🇮🇩', passportStyle: 'southeastasia' },
  PH: { color: '#0038A8', accent: '#CE1126', flag: '🇵🇭', passportStyle: 'southeastasia' },
  TH: { color: '#A51931', accent: '#2D2A4A', flag: '🇹🇭', passportStyle: 'southeastasia' },
  SG: { color: '#E01A22', accent: '#FFFFFF', flag: '🇸🇬', passportStyle: 'southeastasia' },
  MY: { color: '#C1272D', accent: '#FFCC00', flag: '🇲🇾', passportStyle: 'southeastasia' },
  
  SA: { color: '#006C35', accent: '#FFFFFF', flag: '🇸🇦', passportStyle: 'middleeast' },
  AU: { color: '#071D49', accent: '#FFCD00', flag: '🇦🇺', passportStyle: 'americas' },
  IN: { color: '#0C1A30', accent: '#FF9933', flag: '🇮🇳', passportStyle: 'default' },
  
  DEFAULT: { color: '#1a1a2e', accent: '#e94560', flag: '🌍', passportStyle: 'default' }
};

function getGeoTheme(countryCode) {
  const code = (countryCode || '').toUpperCase();
  return COUNTRY_THEMES[code] || COUNTRY_THEMES.DEFAULT;
}

// Initialize Global Geo
window.PT_GEO = { countryCode: 'US', countryName: 'United States' };
detectUserCountry().then(geo => {
  window.PT_GEO = geo;
  console.log('Detected User Country:', geo.countryCode, '-', geo.countryName);
});
