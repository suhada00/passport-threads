/* assets/js/counter.js */
/* Real statistics counter fetcher & progressive layout framing resolver */

async function loadAndDisplayCounter() {
  const el = document.getElementById('passportCount');
  if (!el) return;

  const workerUrl = 'https://passport-threads-worker.workers.dev'; // Base URL (or relative if same origin)
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  // Use relative route in production, absolute in local development
  const statsEndpoint = isLocal ? `${window.location.origin}/api/stats` : '/api/stats';

  try {
    const res = await fetch(statsEndpoint);
    if (!res.ok) throw new Error('Stats endpoint returned error');
    
    const data = await res.json();
    const n = parseInt(data.total_passports) || 0;

    let displayStr = '';
    if (n === 0) {
      displayStr = ''; // Hide on first launch day
    } else if (n < 50) {
      displayStr = `${n} passports issued so far`;
    } else if (n < 500) {
      displayStr = `${n}+ passports issued`;
    } else if (n < 1000) {
      displayStr = `${n.toLocaleString()}+ passports`;
    } else {
      displayStr = `${n.toLocaleString()} passports issued worldwide`;
    }

    if (displayStr) {
      el.textContent = displayStr;
      el.closest('.hero-stats')?.removeAttribute('hidden');
      el.closest('.hero-stats').style.display = 'flex';
    } else {
      el.closest('.hero-stats')?.setAttribute('hidden', '');
      el.closest('.hero-stats').style.display = 'none';
    }
  } catch (err) {
    console.warn('Could not load statistics counter:', err);
    // Hide container silently instead of showing placeholders or raw errors
    el.closest('.hero-stats')?.setAttribute('hidden', '');
    el.closest('.hero-stats').style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', loadAndDisplayCounter);
