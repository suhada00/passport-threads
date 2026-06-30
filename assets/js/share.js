/* assets/js/share.js */
/* Share Logic Controller — Web Share API dispatcher and social intent generator with multi-language support */

const PLATFORM_CONFIGS = {
  twitter:   { w: 1200, h: 630  },   // Landscape card
  instagram: { w: 1080, h: 1080 },   // Square post
  threads:   { w: 1080, h: 1350 },   // Portrait 4:5 post
  download:  { w: 1500, h: 1900 },   // High-res output
};

const SHARE_TEXTS = {
  en: {
    mobileText: (title, nation) => `I'm a "${title}" from the ${nation}! Discover yours 👇`,
    twitterText: (title, nation, tagline) => `Just got my Threads Passport! 🛂\n\nI'm from the "${nation}"\nTitle: "${title}"\n\n"${tagline}"\n\nGet yours 👇`,
    threadsText: (title, nation) => `Just got my Threads Passport! 🛂\n\nI'm from the "${nation}"\nTitle: "${title}"\n\n→ `,
    whatsappText: (title, nation) => `I just got my Threads Passport! 🛂\n\nI'm from the "${nation}"\nMy title: "${title}"\n\nFind out yours: `,
    toastPreparing: 'Preparing share card... ⏳',
    toastTwitter: 'Generating X/Twitter image... 🐦',
    toastTwitterDone: 'Attach the downloaded image to your post! 📸',
    toastInstagram: 'Generating Instagram image... 📸',
    toastInstagramDone: 'Image saved! Upload it to Instagram Feed or Stories 📸',
    toastThreads: 'Generating Threads image... 🧵',
    toastThreadsDone: 'Attach the downloaded card to your Threads post! 🧵',
    toastDownload: 'Generating high-res image... 📥',
    toastDownloadDone: 'Passport downloaded! 📥',
    toastSuccess: 'Shared successfully! 🎉',
    toastCopy: 'Link copied! 🔗',
    toastCopyFail: 'Could not copy — please copy manually'
  },
  id: {
    mobileText: (title, nation) => `Saya seorang "${title}" dari ${nation}! Temukan paspormu 👇`,
    twitterText: (title, nation, tagline) => `Baru dapat Paspor Threads saya! 🛂\n\nSaya dari "${nation}"\nJabatan: "${title}"\n\n"${tagline}"\n\nBuat paspormu di sini 👇`,
    threadsText: (title, nation) => `Baru dapat Paspor Threads saya! 🛂\n\nSaya dari "${nation}"\nJabatan: "${title}"\n\n→ `,
    whatsappText: (title, nation) => `Saya baru saja membuat Paspor Threads! 🛂\n\nSaya dari "${nation}"\nJabatan saya: "${title}"\n\nCek punya kamu di sini: `,
    toastPreparing: 'Menyiapkan kartu paspor... ⏳',
    toastTwitter: 'Membuat gambar X/Twitter... 🐦',
    toastTwitterDone: 'Lampirkan gambar yang diunduh ke postingan Anda! 📸',
    toastInstagram: 'Membuat gambar Instagram... 📸',
    toastInstagramDone: 'Gambar disimpan! Unggah ke Feed atau Stories Instagram Anda 📸',
    toastThreads: 'Membuat gambar Threads... 🧵',
    toastThreadsDone: 'Lampirkan kartu yang diunduh ke postingan Threads Anda! 🧵',
    toastDownload: 'Membuat gambar resolusi tinggi... 📥',
    toastDownloadDone: 'Paspor berhasil diunduh! 📥',
    toastSuccess: 'Berhasil dibagikan! 🎉',
    toastCopy: 'Tautan disalin! 🔗',
    toastCopyFail: 'Gagal menyalin — silakan salin secara manual'
  }
};

function getDict() {
  const lang = window.PT_LANG || document.documentElement.lang || 'en';
  return SHARE_TEXTS[lang] || SHARE_TEXTS.en;
}

// ── MAIN SHARE HANDLER ──
async function handleShare(platform, passportData) {
  const isMobile = window.innerWidth < 768;
  const dict = getDict();

  // Mobile Web Share API
  if (isMobile && platform === 'share' && navigator.share) {
    showToast(dict.toastPreparing);
    try {
      const imageBlob = await renderPassportToBlob('download', passportData);
      const imageFile = new File([imageBlob], 'my-threads-passport.png', { type: 'image/png' });

      // Check if browser supports sharing files
      if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
        await navigator.share({
          title: 'My Threads Passport 🛂',
          text: dict.mobileText(passportData.passport.title, passportData.passport.nation),
          url: `${window.location.origin}?u=${encodeURIComponent(passportData.profile.username)}`,
          files: [imageFile]
        });
      } else {
        // Fallback share text + link without file
        await navigator.share({
          title: 'My Threads Passport 🛂',
          text: dict.mobileText(passportData.passport.title, passportData.passport.nation),
          url: `${window.location.origin}?u=${encodeURIComponent(passportData.profile.username)}`
        });
      }
      showToast(dict.toastSuccess);
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
  const dict = getDict();
  showToast(dict.toastTwitter);
  try {
    const img = await renderPassportToBlob('twitter', data);
    triggerDownload(img, 'threads-passport-twitter.png');
    
    const text = encodeURIComponent(
      dict.twitterText(data.passport.title, data.passport.nation, data.passport.tagline)
    );
    const url  = encodeURIComponent(`${window.location.origin}?u=${encodeURIComponent(data.profile.username)}`);
    const tags = 'ThreadsPassport,Threads';
    
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${tags}`, '_blank', 'noopener');
    showToast(dict.toastTwitterDone);
  } catch (err) {
    showToast(dict.toastCopyFail);
  }
}

async function shareToInstagram(data) {
  const dict = getDict();
  showToast(dict.toastInstagram);
  try {
    const img = await renderPassportToBlob('instagram', data);
    triggerDownload(img, 'threads-passport-instagram.png');
    showToast(dict.toastInstagramDone, 4000);
  } catch (err) {
    showToast(dict.toastCopyFail);
  }
}

async function shareToThreads(data) {
  const dict = getDict();
  showToast(dict.toastThreads);
  try {
    const img  = await renderPassportToBlob('threads', data);
    triggerDownload(img, 'threads-passport.png');
    
    const text = encodeURIComponent(
      dict.threadsText(data.passport.title, data.passport.nation) + `${window.location.origin}?u=${encodeURIComponent(data.profile.username)}`
    );
    window.open(`https://www.threads.net/intent/post?text=${text}`, '_blank', 'noopener');
    showToast(dict.toastThreadsDone);
  } catch (err) {
    showToast(dict.toastCopyFail);
  }
}

function shareToWhatsApp(data) {
  const dict = getDict();
  const text = encodeURIComponent(
    dict.whatsappText(data.passport.title, data.passport.nation) + `${window.location.origin}?u=${encodeURIComponent(data.profile.username)}`
  );
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener');
}

function copyPageLink(data) {
  const dict = getDict();
  const url = `${window.location.origin}?u=${encodeURIComponent(data.profile.username)}`;
  navigator.clipboard.writeText(url)
    .then(() => showToast(dict.toastCopy))
    .catch(() => showToast(dict.toastCopyFail));
}

async function downloadPassport(size, data) {
  const dict = getDict();
  showToast(dict.toastDownload);
  try {
    const img = await renderPassportToBlob(size, data);
    triggerDownload(img, `threads-passport-${data.profile.username}.png`);
    showToast(dict.toastDownloadDone);
  } catch (err) {
    showToast(dict.toastCopyFail);
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
