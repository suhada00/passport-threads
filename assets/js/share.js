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
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Found my official title on Threads: ${title}!\nNation: ${nation} • Badge: ${stamp}\n"${tagline}"\n\nCurious about your title? Create your Threads Passport now, free & just needs a username 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
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
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Ternyata jabatan resmiku di Threads: ${title}!\nNegara: ${nation} • Lencana: ${stamp}\n"${tagline}"\n\nPenasaran kamu dapet jabatan apa? Bikin Paspor Threads-mu sendiri sekarang, gratis & cuma butuh username 👇\n${url}\n\n#PasporThreads #ThreadsAI`,
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
  },
  fr: {
    mobileText: (title, nation) => `Je suis un "${title}" de la ${nation} ! Découvrez le vôtre 👇`,
    twitterText: (title, nation, tagline) => `Je viens d'obtenir mon passeport Threads ! 🛂\n\nJe viens de la "${nation}"\nTitre : "${title}"\n\n"${tagline}"\n\nObtenez le vôtre 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 J'ai trouvé mon titre officiel sur Threads : ${title} !\nNation : ${nation} • Badge : ${stamp}\n"${tagline}"\n\nCurieux de connaître votre titre ? Créez votre passeport Threads maintenant, gratuit et nécessite juste un nom d'utilisateur 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `Je viens d'obtenir mon passeport Threads ! 🛂\n\nJe viens de la "${nation}"\nMon titre : "${title}"\n\nDécouvrez le vôtre : `
  },
  de: {
    mobileText: (title, nation) => `Ich bin ein "${title}" aus ${nation}! Entdecke deins 👇`,
    twitterText: (title, nation, tagline) => `Habe gerade meinen Threads-Reisepass erhalten! 🛂\n\nIch komme aus "${nation}"\nTitel: "${title}"\n\n"${tagline}"\n\nHole dir deinen 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Mein offizieller Titel auf Threads: ${title}!\nNation: ${nation} • Stempel: ${stamp}\n"${tagline}"\n\nNeugierig auf deinen Titel? Erstelle jetzt deinen Threads-Reisepass, kostenlos & benötigt nur einen Benutzernamen 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `Ich habe gerade meinen Threads-Reisepass bekommen! 🛂\n\nIch bin aus "${nation}"\nMijn Titel: "${title}"\n\nFinde deinen heraus: `
  },
  es: {
    mobileText: (title, nation) => `¡Soy un "${title}" de ${nation}! Descubre el tuyo 👇`,
    twitterText: (title, nation, tagline) => `¡Acabo de obtener mi pasaporte de Threads! 🛂\n\nSoy de "${nation}"\nTítulo: "${title}"\n\n"${tagline}"\n\nConsigue el tuyo 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 ¡Descubrí mi título oficial en Threads: ${title}!\nNación: ${nation} • Sello: ${stamp}\n"${tagline}"\n\n¿Tienes curiosidad por tu título? Crea tu pasaporte de Threads ahora, gratis y solo necesitas un nombre de usuario 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `¡Acabo de obtener mi pasaporte de Threads! 🛂\n\nSoy de "${nation}"\nMi título: "${title}"\n\nDescubre el tuyo: `
  },
  pt: {
    mobileText: (title, nation) => `Sou um "${title}" de ${nation}! Descubra o seu 👇`,
    twitterText: (title, nation, tagline) => `Acabei de tirar meu passaporte do Threads! 🛂\n\nSou da "${nation}"\nTítulo: "${title}"\n\n"${tagline}"\n\nGaranta o seu 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Descobri meu título oficial no Threads: ${title}!\nNação: ${nation} • Selo: ${stamp}\n"${tagline}"\n\nCurioso sobre o seu título? Crie seu passaporte do Threads agora, grátis e só precisa de um nome de usuário 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `Acabei de conseguir meu passaporte do Threads! 🛂\n\nSou de "${nation}"\nMeu título: "${title}"\n\nDescubra o seu: `
  },
  it: {
    mobileText: (title, nation) => `Sono un "${title}" da ${nation}! Scopri il tuo 👇`,
    twitterText: (title, nation, tagline) => `Ho appena ottenuto il mio passaporto di Threads! 🛂\n\nProvengo da "${nation}"\nTitolo: "${title}"\n\n"${tagline}"\n\nOttieni il tuo 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Ho scoperto il mio titolo ufficiale su Threads: ${title}!\nNazione: ${nation} • Timbro: ${stamp}\n"${tagline}"\n\nCurioso di sapere il tuo titolo? Crea ora il tuo passaporto di Threads, gratuito e richiede solo un nome utente 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `Ho appena ottenuto il mio passaporto di Threads! 🛂\n\nSono da "${nation}"\nIl mio titolo: "${title}"\n\nScopri il tuo: `
  },
  nl: {
    mobileText: (title, nation) => `Ik ben een "${title}" uit ${nation}! Ontdek de jouwe 👇`,
    twitterText: (title, nation, tagline) => `Heb net mijn Threads-paspoort gekregen! 🛂\n\nIk kom uit "${nation}"\nTitel: "${title}"\n\n"${tagline}"\n\nKoop de jouwe 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Mijn officiële titel op Threads gevonden: ${title}!\nNation: ${nation} • Stempel: ${stamp}\n"${tagline}"\n\nNieuwsgierig naar jouw titel? Maak nu je Threads-paspoort aan, gratis en je hebt alleen een gebruikersnaam nodig 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `Ik heb zojuist mijn Threads-paspoort gekregen! 🛂\n\nIk ben uit "${nation}"\nMijn titel: "${title}"\n\nOntdek de jouwe: `
  },
  sv: {
    mobileText: (title, nation) => `Jag är en "${title}" från ${nation}! Upptäck din 👇`,
    twitterText: (title, nation, tagline) => `Har precis fått mitt Threads-pass! 🛂\n\nJag är från "${nation}"\nTitel: "${title}"\n\n"${tagline}"\n\nHämta ditt 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Hittade min officiella titel på Threads: ${title}!\nNation: ${nation} • Stämpel: ${stamp}\n"${tagline}"\n\nNyfiken på din titel? Skapa ditt Threads-pass nu, gratis & behöver bara ett användarnamn 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `Jag har precis fått mitt Threads-pass! 🛂\n\nJag är från "${nation}"\nMin titel: "${title}"\n\nHitta din: `
  },
  no: {
    mobileText: (title, nation) => `Jeg er en "${title}" fra ${nation}! Oppdag din 👇`,
    twitterText: (title, nation, tagline) => `Har nettopp fått mitt Threads-pass! 🛂\n\nJeg er fra "${nation}"\nTittel: "${title}"\n\n"${tagline}"\n\nHent ditt 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Fant min offisielle tittel på Threads: ${title}!\nNasjon: ${nation} • Stempel: ${stamp}\n"${tagline}"\n\nNysgjerrig på din tittel? Opprett ditt Threads-pass nå, gratis og trenger bare et brukernavn 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `Jeg har nettopp fått mitt Threads-pass! 🛂\n\nJeg er fra "${nation}"\nMin tittel: "${title}"\n\nFinn din: `
  },
  da: {
    mobileText: (title, nation) => `Jeg er en "${title}" fra nation! Oplev din 👇`,
    twitterText: (title, nation, tagline) => `Har lige fået mit Threads-pas! 🛂\n\nJeg er fra "${nation}"\nTitel: "${title}"\n\n"${tagline}"\n\nHent dit 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Fandt min officielle titel på Threads: ${title}!\nNation: ${nation} • Stempel: ${stamp}\n"${tagline}"\n\nNysgerrig efter din titel? Opret dit Threads-pas nu, gratis & kræver kun et brugernavn 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `Jeg har lige fået mit Threads-pas! 🛂\n\nJeg er fra "${nation}"\nMin titel: "${title}"\n\nFind dit: `
  },
  pl: {
    mobileText: (title, nation) => `Jestem "${title}" z ${nation}! Odkryj swój 👇`,
    twitterText: (title, nation, tagline) => `Właśnie otrzymałem mój paszport Threads! 🛂\n\nJestem z "${nation}"\nTytuł: "${title}"\n\n"${tagline}"\n\nOdbierz swój 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Mój oficjalny tytuł na Threads to: ${title}!\nKraj: ${nation} • Pieczątka: ${stamp}\n"${tagline}"\n\nCiekawy swojego tytułu? Stwórz swój paszport Threads teraz, za darmo i potrzebujesz tylko nazwy użytkownika 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `Właśnie otrzymałem mój paszport Threads! 🛂\n\nJestem z "${nation}"\nMój tytuł: "${title}"\n\nOdkryj swój: `
  },
  tr: {
    mobileText: (title, nation) => `Ben ${nation} ülkesinden bir "${title}"! Seninkini keşfet 👇`,
    twitterText: (title, nation, tagline) => `Threads Pasaportumu yeni aldım! 🛂\n\n"${nation}" ülkesindenim\nUnvan: "${title}"\n\n"${tagline}"\n\nSeninkini al 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Threads'teki resmi unvanımı buldum: ${title}!\nÜlke: ${nation} • Mühür: ${stamp}\n"${tagline}"\n\nUnvanını merak ediyor musun? Threads Pasaportunu şimdi oluştur, ücretsiz ve sadece kullanıcı adı gerektirir 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `Threads Pasaportumu yeni aldım! 🛂\n\nBen "${nation}" ülkesindenim\nUnvanım: "${title}"\n\nSeninkini keşfet: `
  },
  ja: {
    mobileText: (title, nation) => `${nation}の「${title}」です！あなたもチェック 👇`,
    twitterText: (title, nation, tagline) => `Threadsパスポートを作成しました！ 🛂\n\n出身：${nation}\n肩書：「${title}」\n\n「${tagline}」\n\nあなたも作ろう👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Threadsでの私の公式の肩書を発見しました：${title}！\n国：${nation} • スタンプ：${stamp}\n「${tagline}」\n\nあなたの肩書も気になりますか？今すぐThreadsパスポートを無料で作成しましょう。ユーザー名だけで作れます 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `Threadsパスポートをゲットしました！ 🛂\n\n出身：${nation}\n肩书：「${title}」\n\nチェックする：`
  },
  ko: {
    mobileText: (title, nation) => `${nation}의 "${title}"입니다! 당신의 여권을 확인하세요 👇`,
    twitterText: (title, nation, tagline) => `Threads 여권을 발급받았습니다! 🛂\n\n소속: "${nation}"\n직함: "${title}"\n\n"${tagline}"\n\n당신의 여권 만들기 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Threads에서 나의 공식 직함을 발견했습니다: ${title}!\n국가: ${nation} • 스탬프: ${stamp}\n"${tagline}"\n\n당신의 직함도 궁금하신가요? 지금 Threads 여권을 무료로 만들어 보세요. 사용자 이름만 있으면 됩니다 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `방금 Threads 여권을 받았습니다! 🛂\n\n소속: "${nation}"\n나의 직함: "${title}"\n\n여권 확인하기:`
  },
  zh: {
    mobileText: (title, nation) => `我是来自${nation}的“${title}”！发现你的👇`,
    twitterText: (title, nation, tagline) => `刚拿到了我的 Threads 护照！ 🛂\n\n我来自“${nation}”\n头衔：“${title}”\n\n“${tagline}”\n\n获取你的👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 发现了我在 Threads 上的官方头衔：${title}！\n国家：${nation} • 印章：${stamp}\n“${tagline}”\n\n好奇你的头衔吗？现在免费创建你的 Threads 护照，只需用户名 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `我刚拿到了我的 Threads 护照！ 🛂\n\n我来自“${nation}”\n我的头衔：“${title}”\n\n发现你的：`
  },
  ar: {
    mobileText: (title, nation) => `أنا "${title}" من ${nation}! اكتشف جوازك 👇`,
    twitterText: (title, nation, tagline) => `حصلت للتو على جواز سفر ثريدز الخاص بي! 🛂\n\nأنا من "${nation}"\nاللقب: "${title}"\n\n"${tagline}"\n\nاحصل على جوازك 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 وجدت لقبي الرسمي على ثريدز: ${title}!\nالدولة: ${nation} • الختم: ${stamp}\n"${tagline}"\n\nفضولي لمعرفة لقبك؟ أنشئ جواز سفر ثريدز الخاص بك الآن، مجاني ويحتاج فقط إلى اسم مستخدم 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `حصلت للتو على جواز سفر ثريدز الخاص بي! 🛂\n\nأنا من "${nation}"\nلقبي: "${title}"\n\nاكتشف جوازك: `
  },
  hi: {
    mobileText: (title, nation) => `मैं ${nation} से एक "${title}" हूँ! अपना पासपोर्ट खोजें 👇`,
    twitterText: (title, nation, tagline) => `अभी-अभी मेरा Threads पासपोर्ट मिला! 🛂\n\nमैं "${nation}" से हूँ\nशीर्षक: "${title}"\n\n"tagline"\n\nअपना प्राप्त करें 👇`,
    threadsText: (title, nation, tagline, stamp, url) => `🚀 Threads पर मेरा आधिकारिक शीर्षक मिला: ${title}!\nदेश: ${nation} • मुहर: ${stamp}\n"${tagline}"\n\nअपना शीर्षक जानने के लिए उत्सुक हैं? अभी अपना Threads पासपोर्ट मुफ्त में बनाएं, केवल उपयोगकर्ता नाम की आवश्यकता है 👇\n${url}\n\n#ThreadsPassport #ThreadsAI`,
    whatsappText: (title, nation) => `मुझे अभी-अभी मेरा Threads पासपोर्ट मिला है! 🛂\n\nमैं "${nation}" से हूँ\nमेरा शीर्षक: "${title}"\n\nअपना खोजें: `
  }
};

function getDict() {
  const lang = window.PT_LANG || document.documentElement.lang || 'en';
  const selected = SHARE_TEXTS[lang] || SHARE_TEXTS.en;
  return { ...SHARE_TEXTS.en, ...selected };
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
    
    const url = `${window.location.origin}?u=${encodeURIComponent(data.profile.username)}`;
    const stamp = (data.passport.stamps && data.passport.stamps.length > 0) ? data.passport.stamps[0] : 'Chronically Online';
    
    const text = encodeURIComponent(
      dict.threadsText(data.passport.title, data.passport.nation, data.passport.tagline, stamp, url)
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
