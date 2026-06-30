/* assets/js/share.js */
/* Share Logic Controller — Web Share API dispatcher and social intent generator */

const PLATFORM_CONFIGS = {
  twitter:   { w: 1200, h: 630  },   // Landscape card
  instagram: { w: 1080, h: 1080 },   // Square post
  threads:   { w: 1080, h: 1350 },   // Portrait 4:5 post
  download:  { w: 1500, h: 1900 },   // High-res output
};

// ── MAIN SHARE HANDLER ──
async function handleShare(platform, passportData) {
  const isMobile = window.innerWidth < 768;

  // Mobile Web Share API
  if (isMobile && platform === 'share' && navigator.share) {
    showToast('Preparing share card... ⏳');
    try {
      const imageBlob = await renderPassportToBlob('download', passportData);
      const imageFile = new File([imageBlob], 'my-threads-passport.png', { type: 'image/png' });

      // Check if browser supports sharing files
      if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
        await navigator.share({
          title: 'My Threads Passport 🛂',
          text: `I'm a "${passportData.passport.title}" from the ${passportData.passport.nation}! Discover yours 👇`,
          url: `${window.location.origin}?u=${encodeURIComponent(passportData.profile.username)}`,
          files: [imageFile]
        });
      } else {
        // Fallback share text + link without file
        await navigator.share({
          title: 'My Threads Passport 🛂',
          text: `I'm a "${passportData.passport.title}" from the ${passportData.passport.nation}! Discover yours 👇`,
          url: `${window.location.origin}?u=${encodeURIComponent(passportData.profile.username)}`
        });
      }
      showToast('Shared successfully! 🎉');
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Web Share failed, downloading instead:', err);
        await downloadPassport('download', passportData);
      }
    }
    return;
  }

  // Platform specific redirects
  switch (platform) {
    case 'twitter':   await shareToTwitter(passportData);   break;
    case 'instagram': await shareToInstagram(passportData); break;
    case 'threads':   await shareToThreads(passportData);   break;
    case 'whatsapp':  shareToWhatsApp(passportData);        break;
    case 'copy':      copyPageLink(passportData);           break;
    case 'download':  await downloadPassport('download', passportData); break;
  }
}

async function shareToTwitter(data) {
  showToast('Generating Twitter image... 🐦');
  try {
    const img = await renderPassportToBlob('twitter', data);
    triggerDownload(img, 'threads-passport-twitter.png');
    
    const text = encodeURIComponent(
      `Just got my Threads Passport! 🛂\n\nI'm from the "${data.passport.nation}"\nTitle: "${data.passport.title}"\n\n"${data.passport.tagline}"\n\nGet yours 👇`
    );
    const url  = encodeURIComponent(`${window.location.origin}?u=${encodeURIComponent(data.profile.username)}`);
    const tags = 'ThreadsPassport,Threads';
    
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${tags}`, '_blank', 'noopener');
    showToast('Attach the downloaded image to your Tweet! 📸');
  } catch (err) {
    showToast('Failed to share to Twitter');
  }
}

async function shareToInstagram(data) {
  showToast('Generating Instagram image... 📸');
  try {
    const img = await renderPassportToBlob('instagram', data);
    triggerDownload(img, 'threads-passport-instagram.png');
    showToast('Image saved! Upload it to Instagram Feed or Stories 📸', 4000);
  } catch (err) {
    showToast('Failed to generate Instagram card');
  }
}

async function shareToThreads(data) {
  showToast('Generating Threads image... 🧵');
  try {
    const img  = await renderPassportToBlob('threads', data);
    triggerDownload(img, 'threads-passport.png');
    
    const text = encodeURIComponent(
      `Just got my Threads Passport! 🛂\n\nI'm from the "${data.passport.nation}"\nTitle: "${data.passport.title}"\n\n→ ${window.location.origin}?u=${encodeURIComponent(data.profile.username)}`
    );
    window.open(`https://www.threads.net/intent/post?text=${text}`, '_blank', 'noopener');
    showToast('Attach the downloaded card to your Threads post! 🧵');
  } catch (err) {
    showToast('Failed to share to Threads');
  }
}

function shareToWhatsApp(data) {
  const text = encodeURIComponent(
    `🛂 I just got my Threads Passport!\n\nI'm from the "${data.passport.nation}"\nMy title: "${data.passport.title}"\n\nFind out yours: ${window.location.origin}?u=${encodeURIComponent(data.profile.username)}`
  );
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener');
}

function copyPageLink(data) {
  const url = `${window.location.origin}?u=${encodeURIComponent(data.profile.username)}`;
  navigator.clipboard.writeText(url)
    .then(() => showToast('Link copied! 🔗'))
    .catch(() => showToast('Could not copy — please copy manually'));
}

async function downloadPassport(size, data) {
  showToast('Generating high-res image... 📥');
  try {
    const img = await renderPassportToBlob(size, data);
    triggerDownload(img, `threads-passport-${data.profile.username}.png`);
    showToast('Passport downloaded! 📥');
  } catch (err) {
    showToast('Failed to download passport');
  }
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// Invoke render method from passport-canvas module
async function renderPassportToBlob(platform, data) {
  const config = PLATFORM_CONFIGS[platform] || PLATFORM_CONFIGS.download;
  return window.PassportCanvas.render(config.w, config.h, data);
}

// ── TOAST HELPER ──
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.removeAttribute('hidden');
  toast.style.display = 'block';
  // Force browser layout reflow
  toast.offsetHeight;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => {
      toast.setAttribute('hidden', '');
      toast.style.display = 'none';
    }, 200);
  }, duration);
}

window.PT_Share = {
  handleShare,
  showToast
};
