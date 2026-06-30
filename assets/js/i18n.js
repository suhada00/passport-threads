/* assets/js/i18n.js */
/* Internationalization (i18n) Engine — Supports 18 languages, RTL text-direction, and Accordion FAQs */

const TRANSLATIONS = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'hero.badge': '✨ Free · No Login · Instant',
    'hero.title.line1': 'Discover Your',
    'hero.title.line2': 'Threads Nation',
    'hero.subtitle': 'Enter your Threads username. Our AI reveals your secret Threads Nation, personality scores, and your official (satirical) title.',
    'stats.label': 'passports issued worldwide',
    'cta.generate': 'Generate Passport',
    'input.help': 'Public accounts only · No login required · Data not stored',
    'loading.analyzing': 'Analyzing your Threads activity...',
    'loading.subtext': 'This takes about 5-10 seconds',
    'manual.title': 'Hmm, we couldn\'t peek at this account',
    'manual.desc': 'Maybe they\'re keeping it private — totally valid! Tell us a bit about how you use Threads instead, and we\'ll create your passport from that.',
    'manual.for': 'Passport for:',
    'manual.cta': 'Generate My Passport Anyway',
    'manual.tryAgain': 'Try a different username',
    'action.share': 'Share',
    'action.download': 'Download',
    'action.save': 'Save',
    'action.new': 'Try Another',
    'related.title': 'Explore More',
    'how.title': 'How It Works',
    'how.s1.title': 'Enter Username',
    'how.s1.desc': 'Type your Threads @username. No login, no password, no personal data collected.',
    'how.s2.title': 'AI Analyzes Your Vibe',
    'how.s2.desc': 'Our AI reads your public profile and posting style to understand your Threads personality.',
    'how.s3.title': 'Discover Your Nation',
    'how.s3.desc': 'Receive your unique Threads Nation, official title, personality scores, and 3 special stamps.',
    'how.s4.title': 'Share It Everywhere',
    'how.s4.desc': 'Share directly to X, Instagram, WhatsApp, or Threads — each optimized for that platform.',
    'faq.title': 'Frequently Asked Questions',
    'footer.tagline': 'The official identity document for Threads citizens of the world.',
    'footer.disclaimer': 'For entertainment purposes only',
    'share.title': 'Share Your Passport',
    'share.subtitle': 'Image is auto-resized for each platform',
    'share.copy': 'Copy Link',
    'share.download': 'Download PNG',
    'share.fullres': 'Full resolution',
    'faq': [
      { q: 'Is it free?', a: 'Yes, completely free. No login or account connection required.' },
      { q: 'Do you store my data?', a: 'No. Your profile data is only used during processing to build the passport card and is never stored on our servers.' },
      { q: 'Why does it need my username?', a: 'We read the public metadata and recent posts of your public Threads account to analyze your writing style.' },
      { q: 'Can I generate a passport for someone else?', a: 'Yes, as long as their Threads account is public.' },
      { q: 'How does Manual Mode work?', a: 'If your account is private, you can write a brief description of how you behave online, and our AI will roast that instead.' }
    ]
  },
  id: {
    'nav.home': 'Beranda',
    'nav.blog': 'Blog',
    'hero.badge': '✨ Gratis · Tanpa Login · Instan',
    'hero.title.line1': 'Temukan',
    'hero.title.line2': 'Negara Threads-mu',
    'hero.subtitle': 'Masukkan username Threads kamu. AI kami akan menganalisis Negara Threads rahasiamu, skor kepribadian, dan gelar (satir) resmimu.',
    'stats.label': 'paspor diterbitkan di seluruh dunia',
    'cta.generate': 'Buat Paspor',
    'input.help': 'Hanya akun publik · Tanpa login · Data tidak disimpan',
    'loading.analyzing': 'Menganalisis aktivitas Threads kamu...',
    'loading.subtext': 'Ini memakan waktu sekitar 5-10 detik',
    'manual.title': 'Hmm, kami tidak bisa melihat akun ini',
    'manual.desc': 'Mungkin akun ini privat — tidak apa-apa! Ceritakan sedikit tentang bagaimana kamu bermain Threads, dan kami akan membuat paspor dari itu.',
    'manual.for': 'Paspor untuk:',
    'manual.cta': 'Tetap Buat Pasporku',
    'manual.tryAgain': 'Coba username lain',
    'action.share': 'Bagikan',
    'action.download': 'Unduh',
    'action.save': 'Simpan',
    'action.new': 'Buat Baru',
    'related.title': 'Jelajahi Lebih Lanjut',
    'how.title': 'Cara Kerja',
    'how.s1.title': 'Masukkan Username',
    'how.s1.desc': 'Ketik @username Threads kamu. Tanpa login, tanpa password, tanpa mengambil data pribadi.',
    'how.s2.title': 'AI Menganalisis Vibe Kamu',
    'how.s2.desc': 'AI kami membaca profil publik dan gaya postingan untuk memahami kepribadian Threads kamu.',
    'how.s3.title': 'Temukan Negaramu',
    'how.s3.desc': 'Dapatkan Negara Threads unik, gelar resmi, skor kepribadian, dan 3 stempel visa spesial.',
    'how.s4.title': 'Bagikan ke Mana Saja',
    'how.s4.desc': 'Bagikan langsung ke X, Instagram, WhatsApp, atau Threads — masing-masing dioptimalkan khusus.',
    'faq.title': 'Pertanyaan Umum (FAQ)',
    'footer.tagline': 'Dokumen identitas resmi untuk warga Threads di seluruh dunia.',
    'footer.disclaimer': 'Hanya untuk hiburan semata',
    'share.title': 'Bagikan Paspor Anda',
    'share.subtitle': 'Gambar disesuaikan otomatis per platform',
    'share.copy': 'Salin Tautan',
    'share.download': 'Unduh PNG',
    'share.fullres': 'Resolusi penuh',
    'faq': [
      { q: 'Apakah ini gratis?', a: 'Ya, sepenuhnya gratis tanpa perlu login akun Meta.' },
      { q: 'Apakah data saya disimpan?', a: 'Tidak. Data profil publik Anda hanya digunakan saat analisis paspor berlangsung dan langsung dihapus.' },
      { q: 'Mengapa butuh username?', a: 'Kami menggunakan profil publik Anda untuk menganalisis gaya menulis dan tipe postingan Anda secara objektif.' },
      { q: 'Bisa buatkan paspor untuk orang lain?', a: 'Tentu saja, asalkan akun Threads mereka diset publik.' },
      { q: 'Bagaimana cara kerja Mode Manual?', a: 'Jika akun diset privat, Anda bisa menulis deskripsi kepribadian Anda sendiri dan AI akan tetap membuatkan roasts paspornya.' }
    ]
  },
  // Supporting translation layouts fallback maps for other 16 languages
  fr: { 'hero.title.line1': 'Découvrez votre', 'hero.title.line2': 'Nation Threads', 'cta.generate': 'Générer le passeport', 'action.share': 'Partager', 'action.download': 'Télécharger' },
  de: { 'hero.title.line1': 'Entdecke deine', 'hero.title.line2': 'Threads-Nation', 'cta.generate': 'Reisepass erstellen', 'action.share': 'Teilen', 'action.download': 'Herunterladen' },
  es: { 'hero.title.line1': 'Descubre tu', 'hero.title.line2': 'Nación de Threads', 'cta.generate': 'Generar pasaporte', 'action.share': 'Compartir', 'action.download': 'Descargar' },
  pt: { 'hero.title.line1': 'Descubra sua', 'hero.title.line2': 'Nação Threads', 'cta.generate': 'Gerar Passaporte', 'action.share': 'Compartilhar', 'action.download': 'Baixar' },
  it: { 'hero.title.line1': 'Scopri la tua', 'hero.title.line2': 'Nazione Threads', 'cta.generate': 'Genera Passaporto', 'action.share': 'Condividi', 'action.download': 'Scarica' },
  nl: { 'hero.title.line1': 'Ontdek jouw', 'hero.title.line2': 'Threads-natie', 'cta.generate': 'Paspoort genereren', 'action.share': 'Delen', 'action.download': 'Downloaden' },
  sv: { 'hero.title.line1': 'Upptäck din', 'hero.title.line2': 'Threads-nation', 'cta.generate': 'Skapa pass', 'action.share': 'Dela', 'action.download': 'Ladda ner' },
  no: { 'hero.title.line1': 'Oppdag din', 'hero.title.line2': 'Threads-nasjon', 'cta.generate': 'Generer pass', 'action.share': 'Del', 'action.download': 'Last ned' },
  da: { 'hero.title.line1': 'Oplev din', 'hero.title.line2': 'Threads-nation', 'cta.generate': 'Generer pas', 'action.share': 'Del', 'action.download': 'Download' },
  pl: { 'hero.title.line1': 'Odkryj swój', 'hero.title.line2': 'Naród Threads', 'cta.generate': 'Generuj paszport', 'action.share': 'Udostępnij', 'action.download': 'Pobierz' },
  tr: { 'hero.title.line1': 'Threads Ulusunu', 'hero.title.line2': 'Keşfet', 'cta.generate': 'Pasaport Oluştur', 'action.share': 'Paylaş', 'action.download': 'İndir' },
  ja: { 'hero.title.line1': 'あなたの', 'hero.title.line2': 'スレッズ国家', 'cta.generate': 'パスポートを作成', 'action.share': 'シェアする', 'action.download': 'ダウンロード' },
  ko: { 'hero.title.line1': '나만의', 'hero.title.line2': '스레드 국가', 'cta.generate': '여권 발급하기', 'action.share': '공유하기', 'action.download': '다운로드' },
  zh: { 'hero.title.line1': '探索你的', 'hero.title.line2': 'Threads国度', 'cta.generate': '生成护照', 'action.share': '分享', 'action.download': '下载' },
  ar: { 'hero.title.line1': 'اكتشف', 'hero.title.line2': 'أمة ثريدز الخاصة بك', 'cta.generate': 'إنشاء جواز السفر', 'action.share': 'مشاركة', 'action.download': 'تحميل' },
  hi: { 'hero.title.line1': 'खोजें अपना', 'hero.title.line2': 'थ्रेड्स राष्ट्र', 'cta.generate': 'पासपोर्ट बनाएं', 'action.share': 'साझा करें', 'action.download': 'डाउनलोड' }
};

const SUPPORTED_LANGS = ['en', 'fr', 'de', 'es', 'pt', 'it', 'nl', 'sv', 'no', 'da', 'pl', 'tr', 'ja', 'ko', 'zh', 'ar', 'hi', 'id'];

const BLOG_ARTICLES = {
  en: [
    { title: 'What Your Threads Posting Style Says About Your Personality', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'A deep psychological analysis of online posting vibes.' },
    { title: 'The 8 Types of Threads Users: A Complete Personality Guide', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Identify which profile archetype fits your online behavior.' },
    { title: 'How to Grow on Threads in 2025: The Algorithm Explained', url: '/blog/how-to-grow-on-threads-2025-algorithm-explained.html', emoji: '📈', desc: 'Proven audience tips for the new meta social platform.' }
  ],
  id: [
    { title: 'Apa Arti Gaya Posting Threads Terhadap Kepribadianmu', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'Analisis psikologi mendalam tentang kebiasaan mengetik di media sosial.' },
    { title: '8 Tipe Pengguna Threads: Panduan Lengkap Karakter', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Cek di mana tipe kepribadian bersosialisasi Anda berada.' },
    { title: 'Cara Mengembangkan Akun Threads di 2025: Algoritma Terbaru', url: '/blog/how-to-grow-on-threads-2025-algorithm-explained.html', emoji: '📈', desc: 'Kiat-kiat menjangkau audiens di platform Threads.' }
  ]
};

// ── i18n Engine Helpers ──
function detectUserLanguage() {
  // 1. Check path lang e.g. /lang/id/index.html
  const pathParts = window.location.pathname.split('/');
  const langIdx = pathParts.indexOf('lang');
  if (langIdx !== -1 && pathParts[langIdx + 1]) {
    const l = pathParts[langIdx + 1].toLowerCase();
    if (SUPPORTED_LANGS.includes(l)) return l;
  }
  
  // 2. Check localStorage
  const saved = localStorage.getItem('pt_lang');
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;

  // 3. Browser detection
  const browserLang = navigator.language?.substring(0, 2).toLowerCase();
  if (SUPPORTED_LANGS.includes(browserLang)) return browserLang;

  return 'en';
}

function applyTranslations(lang) {
  const dictionary = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const englishDict = TRANSLATIONS.en; // Fallback mapping for keys not fully translated

  // Translate all tags containing data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const txt = dictionary[key] || englishDict[key];
    if (txt) {
      el.textContent = txt;
    }
  });

  // Toggle layout direction for Arabic
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }

  // Render Accordion FAQs
  const faqs = dictionary['faq'] || englishDict['faq'];
  const faqList = document.getElementById('faqList');
  if (faqList && faqs) {
    faqList.innerHTML = faqs.map((f, i) => `
      <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
          <span itemprop="name">${f.q}</span>
          <span class="faq-chevron" aria-hidden="true">▾</span>
        </button>
        <div id="faq-answer-${i}" class="faq-answer" hidden itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text">${f.a}</p>
        </div>
      </div>
    `).join('');

    // Bind Accordion Toggles
    faqList.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        btn.nextElementSibling.hidden = expanded;
      });
    });
  }

  // Inject Localized Related Blog Posts
  const articles = BLOG_ARTICLES[lang] || BLOG_ARTICLES.en;
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid && articles) {
    relatedGrid.innerHTML = articles.map(art => `
      <a href="${art.url}" class="related-card" style="text-decoration: none; background: white; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); color: inherit; transition: border-color var(--transition-fast);">
        <span style="font-size: 24px;">${art.emoji}</span>
        <h3 style="font-size: var(--font-size-base); font-weight: 700; margin: 0; color: var(--color-primary);">${art.title}</h3>
        <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin: 0; line-height: 1.4;">${art.desc}</p>
      </a>
    `).join('');
  }
}

// ── Language Selector Bindings ──
function setupLanguageSelector() {
  const btn = document.getElementById('langBtn');
  const dropdown = document.getElementById('langDropdown');
  const label = document.getElementById('currentLangLabel');

  if (!btn || !dropdown) return;

  label.textContent = window.PT_LANG.toUpperCase();

  // Populate Dropdown
  const nameMap = {
    en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español',
    pt: 'Português', it: 'Italiano', nl: 'Nederlands', sv: 'Svenska',
    no: 'Norsk', da: 'Dansk', pl: 'Polski', tr: 'Türkçe',
    ja: '日本語', ko: '한국어', zh: '简体中文', ar: 'العربية',
    hi: 'हिन्दी', id: 'Bahasa Indonesia'
  };

  dropdown.innerHTML = SUPPORTED_LANGS.map(code => `
    <li data-lang="${code}" role="option" aria-selected="${code === window.PT_LANG}">
      ${nameMap[code]}
    </li>
  `).join('');

  btn.addEventListener('click', (e) => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isExpanded);
    dropdown.hidden = isExpanded;
    e.stopPropagation();
  });

  document.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', 'false');
    dropdown.hidden = true;
  });

  dropdown.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      const selected = item.getAttribute('data-lang');
      localStorage.setItem('pt_lang', selected);
      
      // If path points to root, redirect dynamically to lang folder /lang/code/ or vice versa to preserve URL cleanliness
      const pathParts = window.location.pathname.split('/');
      const langIdx = pathParts.indexOf('lang');
      if (langIdx !== -1) {
        pathParts[langIdx + 1] = selected;
        window.location.pathname = pathParts.join('/');
      } else {
        // From home domain: if English redirect to root, otherwise redirect to lang subfolder
        if (selected === 'en') {
          window.location.reload();
        } else {
          window.location.href = `/lang/${selected}/`;
        }
      }
    });
  });
}

// Initialize Global i18n
window.CARD_TRANSLATIONS = {
  en: {
    docType: "PASSPORT",
    name: "NAME",
    username: "USERNAME",
    nation: "THREADS NATION",
    title: "OFFICIAL TITLE",
    metrics: "PERSONALITY METRICS",
    stamps: "VISA STAMPS"
  },
  id: {
    docType: "PASPOR / PASSPORT",
    name: "NAMA / NAME",
    username: "NAMA PENGGUNA / USERNAME",
    nation: "NEGARA THREADS / THREADS NATION",
    title: "GELAR RESMI / OFFICIAL TITLE",
    metrics: "METRIK KEPRIBADIAN / PERSONALITY METRICS",
    stamps: "STEMPEL VISA / VISA STAMPS"
  },
  fr: {
    docType: "PASSEPORT / PASSPORT",
    name: "NOM / NAME",
    username: "NOM D'UTILISATEUR / USERNAME",
    nation: "NATION THREADS / THREADS NATION",
    title: "TITRE OFFICIEL / OFFICIAL TITLE",
    metrics: "PARAMÈTRES DE PERSONNALITÉ / PERSONALITY METRICS",
    stamps: "TAMPONS DE VISA / VISA STAMPS"
  },
  de: {
    docType: "REISEPASS / PASSPORT",
    name: "NAME / NAME",
    username: "BENUTZERNAME / USERNAME",
    nation: "THREADS-NATION / THREADS NATION",
    title: "OFFIZIELLER TITEL / OFFICIAL TITLE",
    metrics: "PERSÖNLICHKEITSWERTE / PERSONALITY METRICS",
    stamps: "VISUMSTEMPEL / VISA STAMPS"
  },
  es: {
    docType: "PASAPORTE / PASSPORT",
    name: "NOMBRE / NAME",
    username: "NOMBRE DE USUARIO / USERNAME",
    nation: "NACIÓN THREADS / THREADS NATION",
    title: "TÍTULO OFICIAL / OFFICIAL TITLE",
    metrics: "MÉTRICAS DE PERSONALIDAD / PERSONALITY METRICS",
    stamps: "SELLOS DE VISA / VISA STAMPS"
  },
  pt: {
    docType: "PASSAPORTE / PASSPORT",
    name: "NOME / NAME",
    username: "NOME DE USUÁRIO / USERNAME",
    nation: "NAÇÃO THREADS / THREADS NATION",
    title: "TÍTULO OFICIAL / OFFICIAL TITLE",
    metrics: "MÉTRICAS DE PERSONALIDADE / PERSONALITY METRICS",
    stamps: "CARIMBOS DE VISTO / VISA STAMPS"
  },
  it: {
    docType: "PASSAPORTO / PASSPORT",
    name: "NOME / NAME",
    username: "NOME UTENTE / USERNAME",
    nation: "NAZIONE THREADS / THREADS NATION",
    title: "TITOLO UFFICIALE / OFFICIAL TITLE",
    metrics: "METRICHE DELLA PERSONALITÀ / PERSONALITY METRICS",
    stamps: "TIMBRI DI VISTO / VISA STAMPS"
  },
  nl: {
    docType: "PASPOORT / PASSPORT",
    name: "NAAM / NAME",
    username: "GEBRUIKERSNAAM / USERNAME",
    nation: "THREADS-NATIE / THREADS NATION",
    title: "OFFICIËLE TITEL / OFFICIAL TITLE",
    metrics: "PERSOONLIJKHEIDSMETRIEKEN / PERSONALITY METRICS",
    stamps: "VISUMSTEMPELS / VISA STAMPS"
  },
  sv: {
    docType: "PASS / PASSPORT",
    name: "NAMN / NAME",
    username: "ANVÄNDARNAMN / USERNAME",
    nation: "THREADS-NATION / THREADS NATION",
    title: "OFFICIELL TITEL / OFFICIAL TITLE",
    metrics: "PERSONLIGHETSMETRIK / PERSONALITY METRICS",
    stamps: "VISUMSTÄMPLAR / VISA STAMPS"
  },
  no: {
    docType: "PASS / PASSPORT",
    name: "NAVN / NAME",
    username: "BRUKERNAVN / USERNAME",
    nation: "THREADS-NASJON / THREADS NATION",
    title: "OFFISIELL TITTEL / OFFICIAL TITLE",
    metrics: "PERSONLIGHETSMETRIKK / PERSONALITY METRICS",
    stamps: "VISUMSTEMPLER / VISA STAMPS"
  },
  da: {
    docType: "PAS / PASSPORT",
    name: "NAVN / NAME",
    username: "BRUGERNAVN / USERNAME",
    nation: "THREADS-NATION / THREADS NATION",
    title: "OFFICIEL TITEL / OFFICIAL TITLE",
    metrics: "PERSONLIGHEDSMETRIK / PERSONALITY METRICS",
    stamps: "VISUMSTEMPLER / VISA STAMPS"
  },
  pl: {
    docType: "PASZPORT / PASSPORT",
    name: "NAZWISKO / NAME",
    username: "NAZWA UŻYTKOWNIKA / USERNAME",
    nation: "NARÓD THREADS / THREADS NATION",
    title: "OFICJALNY TYTUŁ / OFFICIAL TITLE",
    metrics: "METRYKI OSOBOWOŚCI / PERSONALITY METRICS",
    stamps: "PIECZĄTKI WIZOWE / VISA STAMPS"
  },
  tr: {
    docType: "PASAPORT / PASSPORT",
    name: "İSİM / NAME",
    username: "KULLANICI ADI / USERNAME",
    nation: "THREADS ULUSU / THREADS NATION",
    title: "RESMİ UNVAN / OFFICIAL TITLE",
    metrics: "KİŞİLİK ÖLÇÜMLERİ / PERSONALITY METRICS",
    stamps: "VİZE DAMGALARI / VISA STAMPS"
  },
  ja: {
    docType: "旅券 / PASSPORT",
    name: "氏名 / NAME",
    username: "ユーザー名 / USERNAME",
    nation: "スレッズ国家 / THREADS NATION",
    title: "公式肩書 / OFFICIAL TITLE",
    metrics: "性格診断 / PERSONALITY METRICS",
    stamps: "査証スタンプ / VISA STAMPS"
  },
  ko: {
    docType: "여권 / PASSPORT",
    name: "성명 / NAME",
    username: "사용자 이름 / USERNAME",
    nation: "스레드 국가 / THREADS NATION",
    title: "공식 직함 / OFFICIAL TITLE",
    metrics: "성격 측정 / PERSONALITY METRICS",
    stamps: "비자 스탬프 / VISA STAMPS"
  },
  zh: {
    docType: "护照 / PASSPORT",
    name: "姓名 / NAME",
    username: "用户名 / USERNAME",
    nation: "THREADS 国度 / THREADS NATION",
    title: "官方头衔 / OFFICIAL TITLE",
    metrics: "性格指标 / PERSONALITY METRICS",
    stamps: "签证印章 / VISA STAMPS"
  },
  ar: {
    docType: "جواز سفر / PASSPORT",
    name: "الاسم / NAME",
    username: "اسم المستخدم / USERNAME",
    nation: "أمة ثريدز / THREADS NATION",
    title: "اللقب الرسمي / OFFICIAL TITLE",
    metrics: "مقاييس الشخصية / PERSONALITY METRICS",
    stamps: "أختام التأشيرة / VISA STAMPS"
  },
  hi: {
    docType: "पासपोर्ट / PASSPORT",
    name: "नाम / NAME",
    username: "उपयोगकर्ता नाम / USERNAME",
    nation: "थ्रेड्स राष्ट्र / THREADS NATION",
    title: "आधिकारिक उपाधि / OFFICIAL TITLE",
    metrics: "व्यक्तित्व मीट्रिक / PERSONALITY METRICS",
    stamps: "वीजा स्टैम्प / VISA STAMPS"
  }
};

window.PT_LANG = detectUserLanguage();
applyTranslations(window.PT_LANG);
document.addEventListener('DOMContentLoaded', setupLanguageSelector);
