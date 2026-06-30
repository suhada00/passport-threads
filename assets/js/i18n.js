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
    'nav.privacy': 'Privacy',
    'nav.terms': 'Terms',
    'nav.cookies': 'Cookies',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'about.title': 'About Passport Threads',
    'about.content': 'Passport Threads is a fun, satirical profiling tool that analyzes public Meta Threads profiles. Using AI analysis, we generate a humorous identity passport detailing your \'Threads Nation\', a custom title, and funny personality scores. This site is created for entertainment purposes only and is not affiliated with Meta or Threads. We do not store any of your personal details or profile metadata.',
    'contact.title': 'Contact Us',
    'contact.content': 'Have questions, suggestions, or just want to send feedback? We would love to hear from you!\n\nEmail: contact@threadspassport.fun',
    'cookie.banner.text': 'We use cookies to personalize content, ads, and analyze traffic for Google AdSense.',
    'cookie.banner.accept': 'Accept',
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
    'nav.privacy': 'Kebijakan Privasi',
    'nav.terms': 'Ketentuan Layanan',
    'nav.cookies': 'Kebijakan Cookie',
    'nav.about': 'Tentang Kami',
    'nav.contact': 'Hubungi Kami',
    'about.title': 'Tentang Passport Threads',
    'about.content': 'Passport Threads adalah alat pembuat profil satir yang menganalisis profil publik Meta Threads. Menggunakan analisis AI, kami menghasilkan paspor identitas lucu yang merinci \'Negara Threads\' Anda, gelar khusus, dan skor kepribadian yang menggelitik. Situs ini dibuat hanya untuk tujuan hiburan dan tidak berafiliasi dengan Meta atau Threads. Kami tidak menyimpan detail pribadi atau metadata profil Anda.',
    'contact.title': 'Hubungi Kami',
    'contact.content': 'Punya pertanyaan, saran, atau ingin mengirim masukan? Kami akan senang mendengar dari Anda!\n\nEmail: contact@threadspassport.fun',
    'cookie.banner.text': 'Kami menggunakan cookie untuk mempersonalisasi konten, iklan, dan menganalisis lalu lintas untuk Google AdSense.',
    'cookie.banner.accept': 'Setuju',
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
  fr: {
    'nav.home': 'Accueil',
    'nav.blog': 'Blog',
    'hero.badge': '✨ Gratuit · Sans connexion · Instantané',
    'hero.title.line1': 'Découvrez votre',
    'hero.title.line2': 'Nation Threads',
    'hero.subtitle': 'Entrez votre nom d\'utilisateur Threads. Notre IA révèle votre Nation Threads secrète, vos scores de personnalité et votre titre officiel (satirique).',
    'stats.label': 'passeports délivrés dans le monde',
    'cta.generate': 'Générer le passeport',
    'input.help': 'Comptes publics uniquement · Pas de connexion requise · Données non stockées',
    'loading.analyzing': 'Analyse de votre activité Threads en cours...',
    'loading.subtext': 'Cela prend environ 5 à 10 secondes',
    'manual.title': 'Hmm, nous n\'avons pas pu jeter un œil à ce compte',
    'manual.desc': 'Peut-être qu\'il est privé — tout à fait valide ! Dites-nous plutôt comment vous utilisez Threads, et nous créerons votre passeport à partir de cela.',
    'manual.for': 'Passeport pour :',
    'manual.cta': 'Générer mon passeport quand même',
    'manual.tryAgain': 'Essayer un autre nom d\'utilisateur',
    'action.share': 'Partager',
    'action.download': 'Télécharger',
    'action.save': 'Enregistrer',
    'action.new': 'Essayer un autre',
    'related.title': 'Explorer plus',
    'how.title': 'Comment ça marche',
    'how.s1.title': 'Entrez votre nom d\'utilisateur',
    'how.s1.desc': 'Saisissez votre @nom_d\'utilisateur Threads. Pas de connexion, pas de mot de passe, aucune donnée personnelle collectée.',
    'how.s2.title': 'L\'IA analyse votre Vibe',
    'how.s2.desc': 'Notre IA lit votre profil public et votre style de publication pour comprendre votre personnalité Threads.',
    'how.s3.title': 'Découvrez votre Nation',
    'how.s3.desc': 'Recevez votre Nation Threads unique, votre titre officiel, vos scores de personnalité et 3 tampons de visa spéciaux.',
    'how.s4.title': 'Partagez-le partout',
    'how.s4.desc': 'Partagez directement sur X, Instagram, WhatsApp ou Threads — chacun étant optimisé pour cette plateforme.',
    'faq.title': 'Questions fréquemment posées',
    'footer.tagline': 'Le document d\'identité officiel pour les citoyens de Threads du monde entier.',
    'footer.disclaimer': 'À des fins de divertissement uniquement',
    'nav.privacy': 'Confidentialité',
    'nav.terms': 'Conditions d\'utilisation',
    'nav.cookies': 'Cookies',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'about.title': 'À propos de Passport Threads',
    'about.content': 'Passport Threads est un outil de profilage satirique et amusant qui analyse les profils publics de Meta Threads. Grâce à l\'analyse par IA, nous générons un passeport d\'identité humoristique détaillant votre « Nation Threads », un titre personnalisé et des scores de personnalité amusants. Ce site est créé uniquement à des fins de divertissement et n\'est pas affilié à Meta ou à Threads. Nous ne stockons aucune de vos données personnelles ni les métadonnées de votre profil.',
    'contact.title': 'Contactez-nous',
    'contact.content': 'Vous avez des questions, des suggestions ou vous souhaitez simplement nous faire part de vos commentaires ? Nous serions ravis de vous lire !\n\nE-mail : contact@threadspassport.fun',
    'cookie.banner.text': 'Nous utilisons des cookies pour personnaliser le contenu, des annonces et analyser le trafic pour Google AdSense.',
    'cookie.banner.accept': 'Accepter',
    'share.title': 'Partager votre passeport',
    'share.subtitle': 'L\'image est automatiquement redimensionnée pour chaque plateforme',
    'share.copy': 'Copier le lien',
    'share.download': 'Télécharger le PNG',
    'share.fullres': 'Haute résolution',
    'faq': [
      { q: 'Est-ce gratuit ?', a: 'Oui, entièrement gratuit. Aucune connexion ou connexion de compte n\'est requise.' },
      { q: 'Stockez-vous mes données ?', a: 'Non. Les données de votre profil sont uniquement utilisées pendant le traitement pour créer la carte de passeport et ne sont jamais stockées sur nos serveurs.' },
      { q: 'Pourquoi a-t-il besoin de son nom d\'utilisateur ?', a: 'Nous lisons les métadonnées publiques et les publications récentes de votre compte Threads public pour analyser votre style d\'écriture.' },
      { q: 'Puis-je générer un passeport pour quelqu\'un d\'autre ?', a: 'Oui, tant que leur compte Threads est public.' },
      { q: 'Comment fonctionne le mode manuel ?', a: 'Si votre compte est privé, vous pouvez rédiger une brève description de votre comportement en ligne, et notre IA s\'en servira pour créer le passeport.' }
    ]
  },
  de: {
    'nav.home': 'Heim',
    'nav.blog': 'Blog',
    'hero.badge': '✨ Kostenlos · Kein Login · Sofort',
    'hero.title.line1': 'Entdecken Sie Ihr',
    'hero.title.line2': 'Threads Nation',
    'hero.subtitle': 'Geben Sie Ihren Threads-Benutzernamen ein. Unsere KI enthüllt Ihre geheime Threads-Nation, Ihre Persönlichkeitswerte und Ihren offiziellen (satirischen) Titel.',
    'stats.label': 'weltweit ausgestellte Reisepässe',
    'cta.generate': 'Reisepass erstellen',
    'input.help': 'Nur öffentliche Konten · Keine Anmeldung erforderlich · Daten werden nicht gespeichert',
    'loading.analyzing': 'Analysieren Sie Ihre Threads-Aktivität...',
    'loading.subtext': 'Dies dauert etwa 5-10 Sekunden',
    'manual.title': 'Hmm, wir konnten keinen Blick auf dieses Konto werfen',
    'manual.desc': 'Vielleicht halten sie es geheim – völlig berechtigt! Erzählen Sie uns etwas darüber, wie Sie stattdessen Threads verwenden, und wir erstellen daraus Ihren Reisepass.',
    'manual.for': 'Reisepass für:',
    'manual.cta': 'Generieren Sie trotzdem meinen Reisepass',
    'manual.tryAgain': 'Versuchen Sie es mit einem anderen Benutzernamen',
    'action.share': 'Aktie',
    'action.download': 'Herunterladen',
    'action.save': 'Speichern',
    'action.new': 'Versuchen Sie es mit einem anderen',
    'related.title': 'Entdecken Sie mehr',
    'how.title': 'Wie es funktioniert',
    'how.s1.title': 'Geben Sie den Benutzernamen ein',
    'how.s1.desc': 'Geben Sie Ihren Threads-@Benutzernamen ein. Kein Login, kein Passwort, keine persönlichen Daten erhoben.',
    'how.s2.title': 'KI analysiert Ihre Stimmung',
    'how.s2.desc': 'Unsere KI liest Ihr öffentliches Profil und Ihren Posting-Stil, um Ihre Thread-Persönlichkeit zu verstehen.',
    'how.s3.title': 'Entdecken Sie Ihre Nation',
    'how.s3.desc': 'Erhalten Sie Ihre einzigartige Threads Nation, Ihren offiziellen Titel, Persönlichkeitswerte und 3 Sonderstempel.',
    'how.s4.title': 'Teilen Sie es überall',
    'how.s4.desc': 'Direktes Teilen auf X, Instagram, WhatsApp oder Threads – jeweils optimiert für die jeweilige Plattform.',
    'faq.title': 'Häufig gestellte Fragen',
    'footer.tagline': 'Das offizielle Ausweisdokument für Threads-Bürger dieser Welt.',
    'footer.disclaimer': 'Nur zu Unterhaltungszwecken',
    'nav.privacy': 'Privatsphäre',
    'nav.terms': 'Bedingungen',
    'nav.cookies': 'Kekse',
    'nav.about': 'Um',
    'nav.contact': 'Kontakt',
    'about.title': 'Über Passthreads',
    'about.content': 'Passport Threads ist ein unterhaltsames, satirisches Profilierungstool, das öffentliche Meta-Threads-Profile analysiert. Mithilfe einer KI-Analyse erstellen wir einen humorvollen Identitätspass mit detaillierten Angaben zu Ihrer „Threads Nation“, einem benutzerdefinierten Titel und lustigen Persönlichkeitswerten. Diese Website dient ausschließlich Unterhaltungszwecken und steht in keiner Verbindung zu Meta oder Threads. Wir speichern keine Ihrer persönlichen Daten oder Profilmetadaten.',
    'contact.title': 'Kontaktieren Sie uns',
    'contact.content': 'Haben Sie Fragen, Anregungen oder möchten Sie einfach Feedback senden? Wir würden uns freuen, von Ihnen zu hören!\n\nE-Mail: contact@threadspassport.fun',
    'cookie.banner.text': 'Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren und den Datenverkehr für Google AdSense zu analysieren.',
    'cookie.banner.accept': 'Akzeptieren',
    'share.title': 'Teilen Sie Ihren Reisepass',
    'share.subtitle': 'Die Bildgröße wird für jede Plattform automatisch angepasst',
    'share.copy': 'Link kopieren',
    'share.download': 'PNG herunterladen',
    'share.fullres': 'Volle Auflösung',
    'faq': [
      { q: 'Ist es kostenlos?', a: 'Ja, völlig kostenlos. Keine Anmeldung oder Kontoverbindung erforderlich.' },
      { q: 'Speichern Sie meine Daten?', a: 'Nein. Ihre Profildaten werden nur bei der Verarbeitung zur Erstellung der Passkarte verwendet und niemals auf unseren Servern gespeichert.' },
      { q: 'Warum ist mein Benutzername erforderlich?', a: 'Wir lesen die öffentlichen Metadaten und aktuellen Beiträge Ihres öffentlichen Threads-Kontos, um Ihren Schreibstil zu analysieren.' },
      { q: 'Kann ich einen Reisepass für jemand anderen erstellen?', a: 'Ja, solange ihr Threads-Konto öffentlich ist.' },
      { q: 'Wie funktioniert der manuelle Modus?', a: 'Wenn Ihr Konto privat ist, können Sie eine kurze Beschreibung Ihres Online-Verhaltens schreiben, und unsere KI wird diese stattdessen rösten.' }
    ]
  },
  es: {
    'nav.home': 'Hogar',
    'nav.blog': 'Blog',
    'hero.badge': '✨ Gratis · Sin iniciar sesión · Instantáneo',
    'hero.title.line1': 'Descubre tu',
    'hero.title.line2': 'Nación de hilos',
    'hero.subtitle': 'Ingrese su nombre de usuario de Threads. Nuestra IA revela tu Nación Threads secreta, puntuaciones de personalidad y tu título oficial (satírico).',
    'stats.label': 'pasaportes emitidos en todo el mundo',
    'cta.generate': 'Generar pasaporte',
    'input.help': 'Solo cuentas públicas · No es necesario iniciar sesión · Datos no almacenados',
    'loading.analyzing': 'Analizando tu actividad en Threads...',
    'loading.subtext': 'Esto tarda entre 5 y 10 segundos.',
    'manual.title': 'Hmm, no pudimos echar un vistazo a esta cuenta.',
    'manual.desc': 'Tal vez lo mantengan en privado, ¡totalmente válido! Cuéntenos un poco sobre cómo usa Threads y crearemos su pasaporte a partir de eso.',
    'manual.for': 'Pasaporte para:',
    'manual.cta': 'Generar mi pasaporte de todos modos',
    'manual.tryAgain': 'Pruebe con un nombre de usuario diferente',
    'action.share': 'Compartir',
    'action.download': 'Descargar',
    'action.save': 'Ahorrar',
    'action.new': 'Prueba con otro',
    'related.title': 'Explora más',
    'how.title': 'Cómo funciona',
    'how.s1.title': 'Ingrese el nombre de usuario',
    'how.s1.desc': 'Escriba su hilo @nombre de usuario. Sin inicio de sesión, sin contraseña, no se recopilan datos personales.',
    'how.s2.title': 'La IA analiza tu vibra',
    'how.s2.desc': 'Nuestra IA lee su perfil público y su estilo de publicación para comprender su personalidad en Threads.',
    'how.s3.title': 'Descubre tu nación',
    'how.s3.desc': 'Reciba su Threads Nation único, título oficial, puntajes de personalidad y 3 sellos especiales.',
    'how.s4.title': 'Compártelo en todas partes',
    'how.s4.desc': 'Comparta directamente en X, Instagram, WhatsApp o Threads, cada uno optimizado para esa plataforma.',
    'faq.title': 'Preguntas frecuentes',
    'footer.tagline': 'El documento de identidad oficial para los ciudadanos de Threads del mundo.',
    'footer.disclaimer': 'Sólo con fines de entretenimiento',
    'nav.privacy': 'Privacidad',
    'nav.terms': 'Términos',
    'nav.cookies': 'Galletas',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'about.title': 'Acerca de los hilos de pasaportes',
    'about.content': 'Passport Threads es una herramienta de creación de perfiles divertida y satírica que analiza perfiles públicos de Meta Threads. Utilizando el análisis de IA, generamos un pasaporte de identidad humorístico que detalla su \'Threads Nation\', un título personalizado y puntuaciones de personalidad divertidas. Este sitio se creó únicamente con fines de entretenimiento y no está afiliado a Meta ni a Threads. No almacenamos ninguno de sus datos personales ni metadatos de perfil.',
    'contact.title': 'Contáctenos',
    'contact.content': '¿Tiene preguntas, sugerencias o simplemente quiere enviar comentarios? ¡Nos encantaría saber de usted!\n\nCorreo electrónico: contact@threadspassport.fun',
    'cookie.banner.text': 'Utilizamos cookies para personalizar el contenido, los anuncios y analizar el tráfico de Google AdSense.',
    'cookie.banner.accept': 'Aceptar',
    'share.title': 'Comparte tu pasaporte',
    'share.subtitle': 'La imagen cambia de tamaño automáticamente para cada plataforma.',
    'share.copy': 'Copiar enlace',
    'share.download': 'Descargar PNG',
    'share.fullres': 'Resolución completa',
    'faq': [
      { q: '¿Es gratis?', a: 'Sí, completamente gratis. No se requiere inicio de sesión ni conexión de cuenta.' },
      { q: '¿Almacenáis mis datos?', a: 'No. Los datos de su perfil solo se utilizan durante el procesamiento para crear la tarjeta pasaporte y nunca se almacenan en nuestros servidores.' },
      { q: '¿Por qué necesita mi nombre de usuario?', a: 'Leemos los metadatos públicos y las publicaciones recientes de su cuenta pública de Threads para analizar su estilo de escritura.' },
      { q: '¿Puedo generar un pasaporte para otra persona?', a: 'Sí, siempre y cuando su cuenta de Threads sea pública.' },
      { q: '¿Cómo funciona el modo manual?', a: 'Si su cuenta es privada, puede escribir una breve descripción de cómo se comporta en línea y nuestra IA la analizará.' }
    ]
  },
  pt: {
    'nav.home': 'Lar',
    'nav.blog': 'Blogue',
    'hero.badge': '✨ Grátis · Sem login · Instantâneo',
    'hero.title.line1': 'Descubra o seu',
    'hero.title.line2': 'Nação dos Tópicos',
    'hero.subtitle': 'Digite seu nome de usuário do Threads. Nossa IA revela sua nação secreta de Threads, pontuações de personalidade e seu título oficial (satírico).',
    'stats.label': 'passaportes emitidos em todo o mundo',
    'cta.generate': 'Gerar passaporte',
    'input.help': 'Somente contas públicas · Não é necessário fazer login · Dados não armazenados',
    'loading.analyzing': 'Analisando sua atividade de Threads...',
    'loading.subtext': 'Isso leva cerca de 5 a 10 segundos',
    'manual.title': 'Hmm, não conseguimos espiar esta conta',
    'manual.desc': 'Talvez eles estejam mantendo isso privado – totalmente válido! Conte-nos um pouco sobre como você usa Threads e criaremos seu passaporte a partir disso.',
    'manual.for': 'Passaporte para:',
    'manual.cta': 'Gerar meu passaporte mesmo assim',
    'manual.tryAgain': 'Tente um nome de usuário diferente',
    'action.share': 'Compartilhar',
    'action.download': 'Download',
    'action.save': 'Salvar',
    'action.new': 'Tente outro',
    'related.title': 'Explorar mais',
    'how.title': 'Como funciona',
    'how.s1.title': 'Digite o nome de usuário',
    'how.s1.desc': 'Digite seus Threads @nomedeusuário. Sem login, sem senha, sem dados pessoais coletados.',
    'how.s2.title': 'IA analisa sua vibração',
    'how.s2.desc': 'Nossa IA lê seu perfil público e estilo de postagem para entender sua personalidade no Threads.',
    'how.s3.title': 'Descubra sua nação',
    'how.s3.desc': 'Receba sua Nação Threads exclusiva, título oficial, pontuações de personalidade e 3 selos especiais.',
    'how.s4.title': 'Compartilhe em qualquer lugar',
    'how.s4.desc': 'Compartilhe diretamente no X, Instagram, WhatsApp ou Threads — cada um otimizado para essa plataforma.',
    'faq.title': 'Perguntas frequentes',
    'footer.tagline': 'O documento de identidade oficial para cidadãos Threads de todo o mundo.',
    'footer.disclaimer': 'Apenas para fins de entretenimento',
    'nav.privacy': 'Privacidade',
    'nav.terms': 'Termos',
    'nav.cookies': 'Biscoitos',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'about.title': 'Sobre tópicos de passaporte',
    'about.content': 'Passport Threads é uma ferramenta divertida e satírica de criação de perfil que analisa perfis públicos do Meta Threads. Usando a análise de IA, geramos um passaporte de identidade humorístico detalhando sua \'Nação Threads\', um título personalizado e pontuações de personalidade engraçadas. Este site foi criado apenas para fins de entretenimento e não é afiliado à Meta ou Threads. Não armazenamos nenhum dos seus dados pessoais ou metadados de perfil.',
    'contact.title': 'Contate-nos',
    'contact.content': 'Tem dúvidas, sugestões ou apenas deseja enviar feedback? Adoraríamos ouvir de você!\n\nE-mail: contact@threadspassport.fun',
    'cookie.banner.text': 'Usamos cookies para personalizar conteúdo, anúncios e analisar o tráfego do Google AdSense.',
    'cookie.banner.accept': 'Aceitar',
    'share.title': 'Compartilhe seu passaporte',
    'share.subtitle': 'A imagem é redimensionada automaticamente para cada plataforma',
    'share.copy': 'Copiar link',
    'share.download': 'Baixar PNG',
    'share.fullres': 'Resolução total',
    'faq': [
      { q: 'É grátis?', a: 'Sim, totalmente gratuito. Não é necessário login ou conexão de conta.' },
      { q: 'Você armazena meus dados?', a: 'Não. Os dados do seu perfil são usados ​​apenas durante o processamento para construir o cartão de passaporte e nunca são armazenados em nossos servidores.' },
      { q: 'Por que precisa do meu nome de usuário?', a: 'Lemos os metadados públicos e postagens recentes da sua conta pública do Threads para analisar seu estilo de escrita.' },
      { q: 'Posso gerar um passaporte para outra pessoa?', a: 'Sim, desde que a conta do Threads seja pública.' },
      { q: 'Como funciona o modo manual?', a: 'Se sua conta for privada, você pode escrever uma breve descrição de como você se comporta online e nossa IA irá torrar isso.' }
    ]
  },
  it: {
    'nav.home': 'Casa',
    'nav.blog': 'Blog',
    'hero.badge': '✨ Gratuito · Nessun accesso · Istantaneo',
    'hero.title.line1': 'Scopri il tuo',
    'hero.title.line2': 'Nazione dei thread',
    'hero.subtitle': 'Inserisci il tuo nome utente delle discussioni. La nostra intelligenza artificiale rivela la tua nazione segreta di Threads, i punteggi della personalità e il tuo titolo ufficiale (satirico).',
    'stats.label': 'passaporti rilasciati in tutto il mondo',
    'cta.generate': 'Genera passaporto',
    'input.help': 'Solo account pubblici · Nessun accesso richiesto · Dati non archiviati',
    'loading.analyzing': 'Analisi dell\'attività dei thread in corso...',
    'loading.subtext': 'Ciò richiede circa 5-10 secondi',
    'manual.title': 'Hmm, non siamo riusciti a dare un\'occhiata a questo account',
    'manual.desc': 'Forse lo tengono privato: assolutamente valido! Raccontaci invece un po\' come usi Threads e creeremo il tuo passaporto da quello.',
    'manual.for': 'Passaporto per:',
    'manual.cta': 'Genera comunque il mio passaporto',
    'manual.tryAgain': 'Prova un nome utente diverso',
    'action.share': 'Condividere',
    'action.download': 'Scaricamento',
    'action.save': 'Salva',
    'action.new': 'Provane un altro',
    'related.title': 'Esplora di più',
    'how.title': 'Come funziona',
    'how.s1.title': 'Inserisci il nome utente',
    'how.s1.desc': 'Digita i tuoi thread @nomeutente. Nessun login, nessuna password, nessun dato personale raccolto.',
    'how.s2.title': 'L\'intelligenza artificiale analizza le tue vibrazioni',
    'how.s2.desc': 'La nostra intelligenza artificiale legge il tuo profilo pubblico e il tuo stile di pubblicazione per comprendere la personalità dei tuoi thread.',
    'how.s3.title': 'Scopri la tua nazione',
    'how.s3.desc': 'Ricevi la tua unica Threads Nation, titolo ufficiale, punteggi di personalità e 3 francobolli speciali.',
    'how.s4.title': 'Condividilo ovunque',
    'how.s4.desc': 'Condividi direttamente su X, Instagram, WhatsApp o Threads, ciascuno ottimizzato per quella piattaforma.',
    'faq.title': 'Domande frequenti',
    'footer.tagline': 'Il documento d\'identità ufficiale per i cittadini di Threads nel mondo.',
    'footer.disclaimer': 'Solo a scopo di intrattenimento',
    'nav.privacy': 'Privacy',
    'nav.terms': 'Termini',
    'nav.cookies': 'Biscotti',
    'nav.about': 'Di',
    'nav.contact': 'Contatto',
    'about.title': 'Informazioni sui thread del passaporto',
    'about.content': 'Passport Threads è uno strumento di profilazione divertente e satirico che analizza i profili Meta Threads pubblici. Utilizzando l\'analisi dell\'intelligenza artificiale, generiamo un passaporto di identità divertente che descrive in dettaglio la tua "nazione dei thread", un titolo personalizzato e punteggi di personalità divertenti. Questo sito è stato creato solo per scopi di intrattenimento e non è affiliato con Meta o Threads. Non memorizziamo nessuno dei tuoi dati personali o metadati del profilo.',
    'contact.title': 'Contattaci',
    'contact.content': 'Hai domande, suggerimenti o vuoi semplicemente inviare feedback? Ci piacerebbe sentire la tua opinione!\n\nE-mail: contact@threadspassport.fun',
    'cookie.banner.text': 'Utilizziamo i cookie per personalizzare contenuti, annunci e analizzare il traffico per Google AdSense.',
    'cookie.banner.accept': 'Accettare',
    'share.title': 'Condividi il tuo passaporto',
    'share.subtitle': 'L\'immagine viene ridimensionata automaticamente per ciascuna piattaforma',
    'share.copy': 'Copia collegamento',
    'share.download': 'Scarica PNG',
    'share.fullres': 'Risoluzione completa',
    'faq': [
      { q: 'È gratuito?', a: 'Sì, completamente gratuito. Non è richiesto alcun accesso o connessione all\'account.' },
      { q: 'Memorizzi i miei dati?', a: 'No. I dati del tuo profilo vengono utilizzati solo durante l\'elaborazione per creare la carta passaporto e non vengono mai archiviati sui nostri server.' },
      { q: 'Perché è necessario il mio nome utente?', a: 'Leggiamo i metadati pubblici e i post recenti del tuo account Discussioni pubbliche per analizzare il tuo stile di scrittura.' },
      { q: 'Posso generare un passaporto per qualcun altro?', a: 'Sì, purché il loro account Threads sia pubblico.' },
      { q: 'Come funziona la modalità manuale?', a: 'Se il tuo account è privato, puoi scrivere una breve descrizione di come ti comporti online e la nostra intelligenza artificiale invece la arrostirà.' }
    ]
  },
  nl: {
    'nav.home': 'Thuis',
    'nav.blog': 'Bloggen',
    'hero.badge': '✨ Gratis · Geen login · Direct',
    'hero.title.line1': 'Ontdek jouw',
    'hero.title.line2': 'Draden Natie',
    'hero.subtitle': 'Vul uw Threads-gebruikersnaam in. Onze AI onthult je geheime Threads Nation, persoonlijkheidsscores en je officiële (satirische) titel.',
    'stats.label': 'paspoorten die wereldwijd zijn uitgegeven',
    'cta.generate': 'Paspoort genereren',
    'input.help': 'Alleen openbare accounts · Geen login vereist · Gegevens niet opgeslagen',
    'loading.analyzing': 'Je Threads-activiteit analyseren...',
    'loading.subtext': 'Dit duurt ongeveer 5-10 seconden',
    'manual.title': 'Hmm, we konden dit account niet bekijken',
    'manual.desc': 'Misschien houden ze het privé – volkomen terecht! Vertel ons iets over hoe u Threads gebruikt, en wij maken op basis daarvan uw paspoort.',
    'manual.for': 'Paspoort voor:',
    'manual.cta': 'Genereer toch mijn paspoort',
    'manual.tryAgain': 'Probeer een andere gebruikersnaam',
    'action.share': 'Deel',
    'action.download': 'Downloaden',
    'action.save': 'Redden',
    'action.new': 'Probeer een andere',
    'related.title': 'Ontdek meer',
    'how.title': 'Hoe het werkt',
    'how.s1.title': 'Voer gebruikersnaam in',
    'how.s1.desc': 'Typ uw Threads @gebruikersnaam. Geen login, geen wachtwoord, geen persoonlijke gegevens verzameld.',
    'how.s2.title': 'AI analyseert uw sfeer',
    'how.s2.desc': 'Onze AI leest uw openbare profiel en poststijl om uw Threads-persoonlijkheid te begrijpen.',
    'how.s3.title': 'Ontdek uw natie',
    'how.s3.desc': 'Ontvang je unieke Threads Nation, officiële titel, persoonlijkheidsscores en 3 speciale stempels.',
    'how.s4.title': 'Deel het overal',
    'how.s4.desc': 'Deel rechtstreeks op X, Instagram, WhatsApp of Threads, allemaal geoptimaliseerd voor dat platform.',
    'faq.title': 'Veelgestelde vragen',
    'footer.tagline': 'Het officiële identiteitsdocument voor Threads-burgers van de wereld.',
    'footer.disclaimer': 'Alleen voor amusementsdoeleinden',
    'nav.privacy': 'Privacy',
    'nav.terms': 'Voorwaarden',
    'nav.cookies': 'Koekjes',
    'nav.about': 'Over',
    'nav.contact': 'Contact',
    'about.title': 'Over paspoortdraden',
    'about.content': 'Passport Threads is een leuke, satirische profileringstool die openbare Meta Threads-profielen analyseert. Met behulp van AI-analyse genereren we een humoristisch identiteitspaspoort met details over uw \'Threads Nation\', een aangepaste titel en grappige persoonlijkheidsscores. Deze site is uitsluitend gemaakt voor amusementsdoeleinden en is niet gelieerd aan Meta of Threads. We slaan geen van uw persoonlijke gegevens of profielmetagegevens op.',
    'contact.title': 'Neem contact met ons op',
    'contact.content': 'Heeft u vragen, suggesties of wilt u gewoon feedback sturen? Wij horen graag van u!\n\nE-mail: contact@threadspassport.fun',
    'cookie.banner.text': 'We gebruiken cookies om inhoud en advertenties te personaliseren en verkeer voor Google AdSense te analyseren.',
    'cookie.banner.accept': 'Accepteren',
    'share.title': 'Deel uw paspoort',
    'share.subtitle': 'Het formaat van de afbeelding wordt voor elk platform automatisch aangepast',
    'share.copy': 'Kopieer link',
    'share.download': 'PNG downloaden',
    'share.fullres': 'Volledige resolutie',
    'faq': [
      { q: 'Is het gratis?', a: 'Ja, helemaal gratis. Geen login of accountverbinding vereist.' },
      { q: 'Bewaart u mijn gegevens?', a: 'Nee. Uw profielgegevens worden alleen gebruikt tijdens de verwerking voor het samenstellen van de paspoortkaart en worden nooit op onze servers opgeslagen.' },
      { q: 'Waarom heeft het mijn gebruikersnaam nodig?', a: 'We lezen de openbare metadata en recente berichten van uw openbare Threads-account om uw schrijfstijl te analyseren.' },
      { q: 'Kan ik een paspoort voor iemand anders genereren?', a: 'Ja, zolang hun Threads-account openbaar is.' },
      { q: 'Hoe werkt de handmatige modus?', a: 'Als uw account privé is, kunt u een korte beschrijving schrijven van hoe u zich online gedraagt, en onze AI zal dat in plaats daarvan roosteren.' }
    ]
  },
  sv: {
    'nav.home': 'Hem',
    'nav.blog': 'Blogg',
    'hero.badge': '✨ Gratis · Ingen inloggning · Omedelbar',
    'hero.title.line1': 'Upptäck din',
    'hero.title.line2': 'Trådar Nation',
    'hero.subtitle': 'Ange ditt användarnamn för trådar. Vår AI avslöjar din hemliga Threads Nation, personlighetsresultat och din officiella (satiriska) titel.',
    'stats.label': 'pass utfärdade över hela världen',
    'cta.generate': 'Skapa pass',
    'input.help': 'Endast offentliga konton · Ingen inloggning krävs · Data lagras inte',
    'loading.analyzing': 'Analyserar din trådaktivitet...',
    'loading.subtext': 'Detta tar cirka 5-10 sekunder',
    'manual.title': 'Hmm, vi kunde inte kika på det här kontot',
    'manual.desc': 'Kanske håller de det privat - helt giltigt! Berätta lite om hur du använder Threads istället, så skapar vi ditt pass utifrån det.',
    'manual.for': 'Pass för:',
    'manual.cta': 'Generera mitt pass ändå',
    'manual.tryAgain': 'Prova ett annat användarnamn',
    'action.share': 'Dela',
    'action.download': 'Ladda ner',
    'action.save': 'Spara',
    'action.new': 'Prova en annan',
    'related.title': 'Utforska mer',
    'how.title': 'Hur det fungerar',
    'how.s1.title': 'Ange användarnamn',
    'how.s1.desc': 'Skriv in dina trådar @användarnamn. Ingen inloggning, inget lösenord, inga personuppgifter samlade in.',
    'how.s2.title': 'AI analyserar din Vibe',
    'how.s2.desc': 'Vår AI läser din offentliga profil och inläggsstil för att förstå din Threads-personlighet.',
    'how.s3.title': 'Upptäck din nation',
    'how.s3.desc': 'Ta emot din unika Threads Nation, officiella titel, personlighetspoäng och 3 specialstämplar.',
    'how.s4.title': 'Dela den överallt',
    'how.s4.desc': 'Dela direkt till X, Instagram, WhatsApp eller trådar - var och en optimerad för den plattformen.',
    'faq.title': 'Vanliga frågor',
    'footer.tagline': 'Det officiella identitetsdokumentet för Threads-medborgare i världen.',
    'footer.disclaimer': 'Endast för underhållningsändamål',
    'nav.privacy': 'Privatliv',
    'nav.terms': 'Villkor',
    'nav.cookies': 'Småkakor',
    'nav.about': 'Om',
    'nav.contact': 'Kontakta',
    'about.title': 'Om passtrådar',
    'about.content': 'Passport Threads är ett roligt, satiriskt profileringsverktyg som analyserar offentliga Meta Threads-profiler. Med hjälp av AI-analys genererar vi ett humoristiskt identitetspass som beskriver din "Threads Nation", en anpassad titel och roliga personlighetsresultat. Denna sida är skapad endast för underhållningsändamål och är inte kopplad till Meta eller trådar. Vi lagrar inga av dina personuppgifter eller profilmetadata.',
    'contact.title': 'Kontakta oss',
    'contact.content': 'Har du frågor, förslag eller vill du bara skicka feedback? Vi vill gärna höra från dig!\n\nE-post: contact@threadspassport.fun',
    'cookie.banner.text': 'Vi använder cookies för att anpassa innehåll, annonser och analysera trafik för Google AdSense.',
    'cookie.banner.accept': 'Acceptera',
    'share.title': 'Dela ditt pass',
    'share.subtitle': 'Bildstorleken ändras automatiskt för varje plattform',
    'share.copy': 'Kopiera länk',
    'share.download': 'Ladda ner PNG',
    'share.fullres': 'Full upplösning',
    'faq': [
      { q: 'Är det gratis?', a: 'Ja, helt gratis. Ingen inloggning eller kontoanslutning krävs.' },
      { q: 'Lagrar du mina uppgifter?', a: 'Nej. Din profildata används endast under bearbetning för att bygga passkortet och lagras aldrig på våra servrar.' },
      { q: 'Varför behöver det mitt användarnamn?', a: 'Vi läser den offentliga metadatan och de senaste inläggen från ditt offentliga Threads-konto för att analysera din skrivstil.' },
      { q: 'Kan jag skapa ett pass för någon annan?', a: 'Ja, så länge deras Threads-konto är offentligt.' },
      { q: 'Hur fungerar manuellt läge?', a: 'Om ditt konto är privat kan du skriva en kort beskrivning av hur du beter dig online, så rostar vår AI det istället.' }
    ]
  },
  no: {
    'nav.home': 'Hjem',
    'nav.blog': 'Blogg',
    'hero.badge': '✨ Gratis · Ingen pålogging · Øyeblikkelig',
    'hero.title.line1': 'Oppdag din',
    'hero.title.line2': 'Tråder Nation',
    'hero.subtitle': 'Skriv inn Threads-brukernavnet ditt. Vår AI avslører din hemmelige Threads Nation, personlighetsresultater og din offisielle (satiriske) tittel.',
    'stats.label': 'pass utstedt over hele verden',
    'cta.generate': 'Generer pass',
    'input.help': 'Kun offentlige kontoer · Ingen pålogging nødvendig · Data er ikke lagret',
    'loading.analyzing': 'Analyserer trådaktiviteten din ...',
    'loading.subtext': 'Dette tar ca 5-10 sekunder',
    'manual.title': 'Hmm, vi kunne ikke se på denne kontoen',
    'manual.desc': 'Kanskje de holder det privat - helt gyldig! Fortell oss litt om hvordan du bruker Threads i stedet, så lager vi passet ditt ut fra det.',
    'manual.for': 'Pass for:',
    'manual.cta': 'Generer passet mitt uansett',
    'manual.tryAgain': 'Prøv et annet brukernavn',
    'action.share': 'Dele',
    'action.download': 'Last ned',
    'action.save': 'Spare',
    'action.new': 'Prøv en annen',
    'related.title': 'Utforsk mer',
    'how.title': 'Hvordan det fungerer',
    'how.s1.title': 'Skriv inn brukernavn',
    'how.s1.desc': 'Skriv inn dine tråder @brukernavn. Ingen pålogging, ingen passord, ingen personlige data samlet inn.',
    'how.s2.title': 'AI analyserer stemningen din',
    'how.s2.desc': 'Vår AI leser den offentlige profilen din og innleggsstilen din for å forstå Threads-personligheten din.',
    'how.s3.title': 'Oppdag din nasjon',
    'how.s3.desc': 'Motta din unike Threads Nation, offisiell tittel, personlighetspoeng og 3 spesialstempler.',
    'how.s4.title': 'Del den overalt',
    'how.s4.desc': 'Del direkte til X, Instagram, WhatsApp eller Threads - hver optimalisert for den plattformen.',
    'faq.title': 'Ofte stilte spørsmål',
    'footer.tagline': 'Det offisielle identitetsdokumentet for Threads-borgere i verden.',
    'footer.disclaimer': 'Kun for underholdningsformål',
    'nav.privacy': 'Privatliv',
    'nav.terms': 'Vilkår',
    'nav.cookies': 'Informasjonskapsler',
    'nav.about': 'Om',
    'nav.contact': 'Kontakt',
    'about.title': 'Om pass-tråder',
    'about.content': 'Passport Threads er et morsomt, satirisk profileringsverktøy som analyserer offentlige Meta Threads-profiler. Ved å bruke AI-analyse genererer vi et humoristisk identitetspass som beskriver "Threads Nation", en tilpasset tittel og morsomme personlighetsresultater. Dette nettstedet er kun laget for underholdningsformål og er ikke tilknyttet Meta eller Threads. Vi lagrer ingen av dine personlige detaljer eller profilmetadata.',
    'contact.title': 'Kontakt oss',
    'contact.content': 'Har du spørsmål, forslag, eller vil du bare sende tilbakemeldinger? Vi vil gjerne høre fra deg!\n\nE-post: contact@threadspassport.fun',
    'cookie.banner.text': 'Vi bruker informasjonskapsler for å tilpasse innhold, annonser og analysere trafikk for Google AdSense.',
    'cookie.banner.accept': 'Akseptere',
    'share.title': 'Del passet ditt',
    'share.subtitle': 'Bildet endres automatisk for hver plattform',
    'share.copy': 'Kopier lenke',
    'share.download': 'Last ned PNG',
    'share.fullres': 'Full oppløsning',
    'faq': [
      { q: 'Er det gratis?', a: 'Ja, helt gratis. Ingen pålogging eller kontotilkobling kreves.' },
      { q: 'Lagrer du dataene mine?', a: 'Nei. Profildataene dine brukes kun under behandling for å bygge passkortet og lagres aldri på våre servere.' },
      { q: 'Hvorfor trenger den brukernavnet mitt?', a: 'Vi leser de offentlige metadataene og de siste innleggene fra den offentlige Threads-kontoen din for å analysere skrivestilen din.' },
      { q: 'Kan jeg generere pass for noen andre?', a: 'Ja, så lenge Threads-kontoen deres er offentlig.' },
      { q: 'Hvordan fungerer manuell modus?', a: 'Hvis kontoen din er privat, kan du skrive en kort beskrivelse av hvordan du oppfører deg på nettet, og vår AI vil steke det i stedet.' }
    ]
  },
  da: {
    'nav.home': 'Hjem',
    'nav.blog': 'Blog',
    'hero.badge': '✨ Gratis · Intet login · Øjeblikkelig',
    'hero.title.line1': 'Opdag din',
    'hero.title.line2': 'Tråde Nation',
    'hero.subtitle': 'Indtast dit Threads-brugernavn. Vores AI afslører din hemmelige Threads Nation, personlighedsresultater og din officielle (satiriske) titel.',
    'stats.label': 'pas udstedt i hele verden',
    'cta.generate': 'Generer pas',
    'input.help': 'Kun offentlige konti · Intet login påkrævet · Data gemmes ikke',
    'loading.analyzing': 'Analyserer din Threads-aktivitet...',
    'loading.subtext': 'Dette tager omkring 5-10 sekunder',
    'manual.title': 'Hmm, vi kunne ikke kigge på denne konto',
    'manual.desc': 'Måske holder de det privat - helt gyldigt! Fortæl os lidt om, hvordan du bruger Threads i stedet, så laver vi dit pas ud fra det.',
    'manual.for': 'Pas til:',
    'manual.cta': 'Generer mit pas alligevel',
    'manual.tryAgain': 'Prøv et andet brugernavn',
    'action.share': 'Dele',
    'action.download': 'Download',
    'action.save': 'Spare',
    'action.new': 'Prøv en anden',
    'related.title': 'Udforsk mere',
    'how.title': 'Hvordan det virker',
    'how.s1.title': 'Indtast brugernavn',
    'how.s1.desc': 'Indtast dine tråde @brugernavn. Intet login, ingen adgangskode, ingen personlige data indsamlet.',
    'how.s2.title': 'AI analyserer din stemning',
    'how.s2.desc': 'Vores AI læser din offentlige profil og din poststil for at forstå din Threads-personlighed.',
    'how.s3.title': 'Opdag din nation',
    'how.s3.desc': 'Modtag din unikke Threads Nation, officielle titel, personlighedsresultater og 3 specielle stempler.',
    'how.s4.title': 'Del det overalt',
    'how.s4.desc': 'Del direkte til X, Instagram, WhatsApp eller Threads - hver optimeret til den pågældende platform.',
    'faq.title': 'Ofte stillede spørgsmål',
    'footer.tagline': 'Det officielle identitetsdokument for Threads-borgere i verden.',
    'footer.disclaimer': 'Kun til underholdningsformål',
    'nav.privacy': 'Privatliv',
    'nav.terms': 'Vilkår',
    'nav.cookies': 'Cookies',
    'nav.about': 'Om',
    'nav.contact': 'Kontakte',
    'about.title': 'Om pastråde',
    'about.content': 'Passport Threads er et sjovt, satirisk profileringsværktøj, der analyserer offentlige Meta Threads-profiler. Ved hjælp af AI-analyse genererer vi et humoristisk identitetspas, der beskriver din \'Threads Nation\', en tilpasset titel og sjove personlighedsresultater. Denne side er kun lavet til underholdningsformål og er ikke tilknyttet Meta eller Threads. Vi gemmer ingen af ​​dine personlige oplysninger eller profilmetadata.',
    'contact.title': 'Kontakt os',
    'contact.content': 'Har du spørgsmål, forslag eller vil du bare sende feedback? Vi vil meget gerne høre fra dig!\n\nE-mail: contact@threadspassport.fun',
    'cookie.banner.text': 'Vi bruger cookies til at tilpasse indhold, annoncer og analysere trafik til Google AdSense.',
    'cookie.banner.accept': 'Acceptere',
    'share.title': 'Del dit pas',
    'share.subtitle': 'Billedets størrelse tilpasses automatisk for hver platform',
    'share.copy': 'Kopiér link',
    'share.download': 'Download PNG',
    'share.fullres': 'Fuld opløsning',
    'faq': [
      { q: 'Er det gratis?', a: 'Ja, helt gratis. Ingen login eller kontoforbindelse påkrævet.' },
      { q: 'Gemmer du mine data?', a: 'Nej. Dine profildata bruges kun under behandlingen til at bygge paskortet og gemmes aldrig på vores servere.' },
      { q: 'Hvorfor har det brug for mit brugernavn?', a: 'Vi læser de offentlige metadata og de seneste indlæg fra din offentlige Threads-konto for at analysere din skrivestil.' },
      { q: 'Kan jeg generere et pas til en anden?', a: 'Ja, så længe deres Threads-konto er offentlig.' },
      { q: 'Hvordan fungerer manuel tilstand?', a: 'Hvis din konto er privat, kan du skrive en kort beskrivelse af, hvordan du opfører dig online, og vores AI vil stege det i stedet.' }
    ]
  },
  pl: {
    'nav.home': 'Dom',
    'nav.blog': 'Bloga',
    'hero.badge': '✨ Bezpłatne · Bez logowania · Natychmiastowe',
    'hero.title.line1': 'Odkryj swoje',
    'hero.title.line2': 'Naród wątków',
    'hero.subtitle': 'Wpisz swoją nazwę użytkownika Threads. Nasza sztuczna inteligencja ujawnia Twój sekretny kraj Threads Nation, wyniki osobowości i Twój oficjalny (satyryczny) tytuł.',
    'stats.label': 'paszporty wydawane na całym świecie',
    'cta.generate': 'Wygeneruj paszport',
    'input.help': 'Tylko konta publiczne · Nie wymaga logowania · Dane nie są przechowywane',
    'loading.analyzing': 'Analizuję Twoją aktywność w wątkach...',
    'loading.subtext': 'Zajmuje to około 5-10 sekund',
    'manual.title': 'Hmm, nie mogliśmy zajrzeć do tego konta',
    'manual.desc': 'Może trzymają to w tajemnicy – ​​całkowicie uzasadnione! Opowiedz nam trochę o tym, jak zamiast tego korzystasz z Threads, a my utworzymy na tej podstawie Twój paszport.',
    'manual.for': 'Paszport dla:',
    'manual.cta': 'Mimo to wygeneruj mój paszport',
    'manual.tryAgain': 'Wypróbuj inną nazwę użytkownika',
    'action.share': 'Udział',
    'action.download': 'Pobierać',
    'action.save': 'Ratować',
    'action.new': 'Spróbuj innego',
    'related.title': 'Odkryj więcej',
    'how.title': 'Jak to działa',
    'how.s1.title': 'Wprowadź nazwę użytkownika',
    'how.s1.desc': 'Wpisz swoje wątki @nazwa użytkownika. Bez logowania, bez hasła, bez zbierania danych osobowych.',
    'how.s2.title': 'AI analizuje Twój klimat',
    'how.s2.desc': 'Nasza sztuczna inteligencja odczytuje Twój profil publiczny i styl publikowania, aby zrozumieć Twoją osobowość w Wątkach.',
    'how.s3.title': 'Odkryj swój naród',
    'how.s3.desc': 'Otrzymaj swój unikalny kraj Threads Nation, oficjalny tytuł, wyniki osobowości i 3 specjalne znaczki.',
    'how.s4.title': 'Udostępnij to wszędzie',
    'how.s4.desc': 'Udostępniaj bezpośrednio w X, Instagramie, WhatsApp lub Threads — każdy zoptymalizowany pod kątem tej platformy.',
    'faq.title': 'Często zadawane pytania',
    'footer.tagline': 'Oficjalny dokument tożsamości obywateli Threads na świecie.',
    'footer.disclaimer': 'Tylko w celach rozrywkowych',
    'nav.privacy': 'Prywatność',
    'nav.terms': 'Warunki',
    'nav.cookies': 'Ciastka',
    'nav.about': 'O',
    'nav.contact': 'Kontakt',
    'about.title': 'O wątkach paszportowych',
    'about.content': 'Passport Threads to zabawne, satyryczne narzędzie do profilowania, które analizuje publiczne profile Meta Threads. Korzystając z analizy AI, generujemy humorystyczny paszport tożsamości, zawierający szczegółowe informacje o Twoim „Narodzie wątków”, niestandardowy tytuł i zabawne wyniki osobowości. Ta witryna została stworzona wyłącznie w celach rozrywkowych i nie jest powiązana z Meta ani Threads. Nie przechowujemy żadnych Twoich danych osobowych ani metadanych profilowych.',
    'contact.title': 'Skontaktuj się z nami',
    'contact.content': 'Masz pytania, sugestie lub po prostu chcesz przesłać opinię? Bardzo chcielibyśmy usłyszeć od Ciebie!\n\nE-mail: contact@threadspassport.fun',
    'cookie.banner.text': 'Używamy plików cookie do personalizowania treści, reklam i analizowania ruchu dla Google AdSense.',
    'cookie.banner.accept': 'Przyjąć',
    'share.title': 'Udostępnij swój paszport',
    'share.subtitle': 'Rozmiar obrazu jest automatycznie dopasowywany dla każdej platformy',
    'share.copy': 'Skopiuj link',
    'share.download': 'Pobierz PNG',
    'share.fullres': 'Pełna rozdzielczość',
    'faq': [
      { q: 'Czy to jest bezpłatne?', a: 'Tak, całkowicie za darmo. Nie wymaga logowania ani połączenia z kontem.' },
      { q: 'Czy przechowujecie moje dane?', a: 'Nie. Dane Twojego profilu są wykorzystywane wyłącznie podczas przetwarzania w celu stworzenia karty paszportowej i nigdy nie są przechowywane na naszych serwerach.' },
      { q: 'Dlaczego potrzebuje mojej nazwy użytkownika?', a: 'Czytamy publiczne metadane i ostatnie posty na Twoim publicznym koncie w Threads, aby przeanalizować Twój styl pisania.' },
      { q: 'Czy mogę wygenerować paszport dla innej osoby?', a: 'Tak, pod warunkiem, że ich konto w Threads jest publiczne.' },
      { q: 'Jak działa tryb ręczny?', a: 'Jeśli Twoje konto jest prywatne, możesz napisać krótki opis swojego zachowania w Internecie, a nasza sztuczna inteligencja zamiast tego go upiecze.' }
    ]
  },
  tr: {
    'nav.home': 'Ev',
    'nav.blog': 'Blog',
    'hero.badge': '✨ Ücretsiz · Giriş Yok · Anında',
    'hero.title.line1': 'Keşfedin',
    'hero.title.line2': 'Konu Ulusu',
    'hero.subtitle': 'Konular kullanıcı adınızı girin. Yapay zekamız gizli Threads Ulusunuzu, kişilik puanlarınızı ve resmi (hicivsel) unvanınızı ortaya çıkarır.',
    'stats.label': 'dünya çapında verilen pasaportlar',
    'cta.generate': 'Pasaport Oluştur',
    'input.help': 'Yalnızca herkese açık hesaplar · Oturum açmanıza gerek yok · Veriler saklanmıyor',
    'loading.analyzing': 'Threads etkinliğiniz analiz ediliyor...',
    'loading.subtext': 'Bu yaklaşık 5-10 saniye sürer',
    'manual.title': 'Hmm, bu hesaba göz atamadık',
    'manual.desc': 'Belki de bunu gizli tutuyorlar; tamamen geçerli! Bize bunun yerine Threads\'i nasıl kullandığınız hakkında biraz bilgi verin, pasaportunuzu bundan oluşturalım.',
    'manual.for': 'Pasaport:',
    'manual.cta': 'Yine de Pasaportumu Oluştur',
    'manual.tryAgain': 'Farklı bir kullanıcı adı deneyin',
    'action.share': 'Paylaşmak',
    'action.download': 'İndirmek',
    'action.save': 'Kaydetmek',
    'action.new': 'Başka Bir Deneyin',
    'related.title': 'Daha Fazlasını Keşfedin',
    'how.title': 'Nasıl Çalışır?',
    'how.s1.title': 'Kullanıcı adını girin',
    'how.s1.desc': 'Konu @kullanıcı adınızı yazın. Oturum açma yok, şifre yok, toplanan kişisel veriler yok.',
    'how.s2.title': 'Yapay Zeka Ortamınızı Analiz Ediyor',
    'how.s2.desc': 'Yapay zekamız, Threads kişiliğinizi anlamak için herkese açık profilinizi ve paylaşım stilinizi okur.',
    'how.s3.title': 'Ülkenizi Keşfedin',
    'how.s3.desc': 'Benzersiz Threads Nation\'ınızı, resmi unvanınızı, kişilik puanlarınızı ve 3 özel pulunuzu alın.',
    'how.s4.title': 'Her Yerde Paylaşın',
    'how.s4.desc': 'Her biri söz konusu platform için optimize edilmiş olan X, Instagram, WhatsApp veya Threads ile doğrudan paylaşın.',
    'faq.title': 'Sıkça Sorulan Sorular',
    'footer.tagline': 'Dünyadaki Threads vatandaşlarının resmi kimlik belgesi.',
    'footer.disclaimer': 'Yalnızca eğlence amaçlıdır',
    'nav.privacy': 'Mahremiyet',
    'nav.terms': 'Şartlar',
    'nav.cookies': 'Çerezler',
    'nav.about': 'Hakkında',
    'nav.contact': 'Temas etmek',
    'about.title': 'Pasaport Konuları Hakkında',
    'about.content': 'Passport Threads, genel Meta Threads profillerini analiz eden eğlenceli, hicivli bir profil oluşturma aracıdır. Yapay zeka analizini kullanarak, \'Threads Nation\'ınızı, özel bir unvanınızı ve komik kişilik puanlarınızı detaylandıran mizahi bir kimlik pasaportu oluşturuyoruz. Bu site yalnızca eğlence amaçlı oluşturulmuştur ve Meta veya Konularla bağlantısı yoktur. Kişisel bilgilerinizin veya profil meta verilerinizin hiçbirini saklamayız.',
    'contact.title': 'Bize Ulaşın',
    'contact.content': 'Sorularınız, önerileriniz mi var veya yalnızca geri bildirim mi göndermek istiyorsunuz? Sizden haber almayı çok isteriz!\n\nE-posta: contact@threadspassport.fun',
    'cookie.banner.text': 'İçeriği, reklamları kişiselleştirmek ve Google AdSense trafiğini analiz etmek için çerezleri kullanırız.',
    'cookie.banner.accept': 'Kabul etmek',
    'share.title': 'Pasaportunuzu Paylaşın',
    'share.subtitle': 'Resim her platform için otomatik olarak yeniden boyutlandırılır',
    'share.copy': 'Bağlantıyı Kopyala',
    'share.download': 'PNG\'yi indir',
    'share.fullres': 'Tam çözünürlük',
    'faq': [
      { q: 'Ücretsiz mi?', a: 'Evet, tamamen ücretsiz. Oturum açma veya hesap bağlantısı gerekmez.' },
      { q: 'Verilerimi saklıyor musunuz?', a: 'Hayır. Profil verileriniz yalnızca pasaport kartının oluşturulması sırasında kullanılır ve hiçbir zaman sunucularımızda saklanmaz.' },
      { q: 'Neden kullanıcı adıma ihtiyacı var?', a: 'Yazma stilinizi analiz etmek için genel meta verileri ve herkese açık Konular hesabınızın son gönderilerini okuyoruz.' },
      { q: 'Başkası için pasaport oluşturabilir miyim?', a: 'Evet, Threads hesapları herkese açık olduğu sürece.' },
      { q: 'Manuel Mod nasıl çalışır?', a: 'Hesabınız gizliyse, çevrimiçi ortamda nasıl davrandığınıza dair kısa bir açıklama yazabilirsiniz; bunun yerine yapay zekamız bunu değerlendirecektir.' }
    ]
  },
  ja: {
    'nav.home': '家',
    'nav.blog': 'ブログ',
    'hero.badge': '✨ 無料・ログイン不要・インスタント',
    'hero.title.line1': 'あなたの発見',
    'hero.title.line2': 'スレッドネーション',
    'hero.subtitle': 'スレッドのユーザー名を入力します。私たちの AI は、あなたの秘密の Threads Nation、性格スコア、公式 (風刺) 称号を明らかにします。',
    'stats.label': '世界中で発行されるパスポート',
    'cta.generate': 'パスポートの生成',
    'input.help': 'パブリックアカウントのみ · ログイン不要 · データは保存されません',
    'loading.analyzing': 'スレッドアクティビティを分析しています...',
    'loading.subtext': 'これには約 5 ～ 10 秒かかります',
    'manual.title': 'うーん、このアカウントは覗けませんでした',
    'manual.desc': 'おそらく彼らはそれを非公開にしているのでしょう - それは完全に正当です!代わりに Threads をどのように使用するかについて少し教えてください。それに基づいてパスポートを作成します。',
    'manual.for': 'パスポート:',
    'manual.cta': 'とにかくパスポートを生成する',
    'manual.tryAgain': '別のユーザー名を試してください',
    'action.share': '共有',
    'action.download': 'ダウンロード',
    'action.save': '保存',
    'action.new': '別のものを試してみる',
    'related.title': 'もっと詳しく見る',
    'how.title': '仕組み',
    'how.s1.title': 'ユーザー名を入力してください',
    'how.s1.desc': 'スレッド @ユーザー名を入力します。ログインもパスワードも個人データも収集されません。',
    'how.s2.title': 'AIがあなたの雰囲気を分析',
    'how.s2.desc': '当社の AI はあなたの公開プロフィールと投稿スタイルを読み取り、スレッドの性格を理解します。',
    'how.s3.title': 'あなたの国を発見してください',
    'how.s3.desc': 'あなただけの Threads Nation、正式な称号、性格スコア、および 3 つの特別なスタンプを受け取りましょう。',
    'how.s4.title': 'どこでも共有',
    'how.s4.desc': 'X、Instagram、WhatsApp、またはスレッドに直接共有します。それぞれがそのプラットフォームに最適化されています。',
    'faq.title': 'よくある質問',
    'footer.tagline': '世界中のスレッド市民の公式身分証明書。',
    'footer.disclaimer': '娯楽目的のみ',
    'nav.privacy': 'プライバシー',
    'nav.terms': '条項',
    'nav.cookies': 'クッキー',
    'nav.about': 'について',
    'nav.contact': '接触',
    'about.title': 'パスポートのスレッドについて',
    'about.content': 'Passport Threads は、公開されているメタ スレッド プロファイルを分析する、楽しくて風刺的なプロファイリング ツールです。 AI 分析を使用して、あなたの「Threads Nation」の詳細を示すユーモラスなアイデンティティ パスポート、カスタム タイトル、面白い性格スコアを生成します。このサイトはエンターテイメントのみを目的として作成されており、メタやスレッドとは提携していません。当社はお客様の個人情報やプロフィールのメタデータを一切保存しません。',
    'contact.title': 'お問い合わせ',
    'contact.content': 'ご質問やご提案がありますか、それともフィードバックを送信したいだけですか?ぜひご連絡ください。\n\n電子メール: contact@threadspassport.fun',
    'cookie.banner.text': '当社は、コンテンツや広告をパーソナライズし、Google AdSense のトラフィックを分析するために Cookie を使用します。',
    'cookie.banner.accept': '受け入れる',
    'share.title': 'パスポートを共有する',
    'share.subtitle': '画像はプラットフォームごとに自動サイズ変更されます',
    'share.copy': 'リンクをコピー',
    'share.download': 'PNGをダウンロード',
    'share.fullres': 'フル解像度',
    'faq': [
      { q: '無料ですか？', a: 'はい、完全に無料です。ログインやアカウント接続は必要ありません。' },
      { q: '私のデータを保存しますか?', a: 'いいえ。あなたのプロフィール データはパスポート カードを作成する処理中にのみ使用され、当社のサーバーに保存されることはありません。' },
      { q: 'なぜ私のユーザー名が必要なのでしょうか?', a: '私たちは、公開メタデータと公開スレッド アカウントの最近の投稿を読み取り、あなたの文章スタイルを分析します。' },
      { q: '他人のパスポートを生成できますか?', a: 'はい、スレッド アカウントが公開されている限り可能です。' },
      { q: 'マニュアルモードはどのように機能しますか?', a: 'アカウントが非公開の場合は、オンラインでの行動についての簡単な説明を書くことができ、代わりに AI がそれをローストします。' }
    ]
  },
  ko: {
    'nav.home': '집',
    'nav.blog': '블로그',
    'hero.badge': '✨ 무료 · 로그인 없음 · 즉시',
    'hero.title.line1': '당신의 발견',
    'hero.title.line2': '스레드 국가',
    'hero.subtitle': '스레드 사용자 이름을 입력하세요. 우리의 AI는 귀하의 비밀 Threads Nation, 성격 점수 및 귀하의 공식(풍자적) 직함을 공개합니다.',
    'stats.label': '전 세계적으로 발행되는 여권',
    'cta.generate': '여권 생성',
    'input.help': '공개 계정만 가능 · 로그인 필요 없음 · 데이터가 저장되지 않음',
    'loading.analyzing': '스레드 활동 분석 중...',
    'loading.subtext': '5~10초 정도 소요됩니다',
    'manual.title': '흠, 이 계정을 엿볼 수 없었습니다',
    'manual.desc': '어쩌면 그들은 그것을 비공개로 유지하고 있을지도 모릅니다. 완전히 유효합니다! 대신 Threads를 어떻게 사용하는지 알려주시면 이를 토대로 여권을 만들어 드리겠습니다.',
    'manual.for': '여권:',
    'manual.cta': '어쨌든 내 여권을 생성하세요',
    'manual.tryAgain': '다른 사용자 이름을 사용해 보세요',
    'action.share': '공유하다',
    'action.download': '다운로드',
    'action.save': '구하다',
    'action.new': '다른 시도',
    'related.title': '더 탐색하기',
    'how.title': '작동 방식',
    'how.s1.title': '사용자 이름을 입력하세요',
    'how.s1.desc': '스레드 @사용자 이름을 입력하세요. 로그인도, 비밀번호도, 개인정보도 수집되지 않습니다.',
    'how.s2.title': 'AI가 당신의 분위기를 분석합니다',
    'how.s2.desc': '우리의 AI는 귀하의 공개 프로필과 게시 스타일을 읽고 귀하의 Threads 성격을 이해합니다.',
    'how.s3.title': '당신의 나라를 발견하세요',
    'how.s3.desc': '독특한 Threads Nation, 공식 타이틀, 성격 점수 및 3개의 특별 스탬프를 받으세요.',
    'how.s4.title': '어디서나 공유하세요',
    'how.s4.desc': 'X, Instagram, WhatsApp 또는 Threads에 직접 공유하세요. 각각은 해당 플랫폼에 최적화되어 있습니다.',
    'faq.title': '자주 묻는 질문',
    'footer.tagline': '전 세계 Threads 시민을 위한 공식 신분증입니다.',
    'footer.disclaimer': '오락 목적으로만 사용',
    'nav.privacy': '은둔',
    'nav.terms': '자귀',
    'nav.cookies': '쿠키',
    'nav.about': '에 대한',
    'nav.contact': '연락하다',
    'about.title': '여권 스레드 정보',
    'about.content': 'Passport Threads는 공개 메타 스레드 프로필을 분석하는 재미있고 풍자적인 프로파일링 도구입니다. AI 분석을 사용하여 \'Threads Nation\', 맞춤 제목, 재미있는 성격 점수를 자세히 설명하는 유머러스한 신원 여권을 생성합니다. 이 사이트는 오락 목적으로만 만들어졌으며 Meta 또는 Threads와 관련이 없습니다. 우리는 귀하의 개인 정보나 프로필 메타데이터를 저장하지 않습니다.',
    'contact.title': '문의하기',
    'contact.content': '질문이나 제안 사항이 있거나 피드백을 보내고 싶으십니까? 우리는 당신의 의견을 듣고 싶습니다!\n\n이메일: contact@threadspassport.fun',
    'cookie.banner.text': '당사는 콘텐츠와 광고를 개인화하고 Google 애드센스의 트래픽을 분석하기 위해 쿠키를 사용합니다.',
    'cookie.banner.accept': '수용하다',
    'share.title': '여권을 공유하세요',
    'share.subtitle': '각 플랫폼에 맞게 이미지 크기가 자동으로 조정됩니다.',
    'share.copy': '링크 복사',
    'share.download': 'PNG 다운로드',
    'share.fullres': '전체 해상도',
    'faq': [
      { q: '무료인가요?', a: '예, 완전 무료입니다. 로그인이나 계정 연결이 필요하지 않습니다.' },
      { q: '내 데이터를 저장하나요?', a: '아니요. 귀하의 프로필 데이터는 여권 카드 작성을 위한 처리 중에만 사용되며 당사 서버에는 저장되지 않습니다.' },
      { q: '왜 내 사용자 이름이 필요한가요?', a: '우리는 귀하의 공개 스레드 계정의 공개 메타데이터와 최근 게시물을 읽어 귀하의 글쓰기 스타일을 분석합니다.' },
      { q: '다른 사람의 여권을 생성할 수 있나요?', a: '예, Threads 계정이 공개라면 가능합니다.' },
      { q: '수동 모드는 어떻게 작동하나요?', a: '귀하의 계정이 비공개인 경우 온라인에서 어떻게 행동하는지에 대한 간략한 설명을 작성할 수 있으며, 대신 AI가 이를 로스팅합니다.' }
    ]
  },
  zh: {
    'nav.home': '家',
    'nav.blog': '博客',
    'hero.badge': '✨ 免费 · 无需登录 · 即时',
    'hero.title.line1': '发现你的',
    'hero.title.line2': '线程国家',
    'hero.subtitle': '输入您的线程用户名。我们的人工智能会揭示您的秘密 Threads Nation、个性分数和您的官方（讽刺）头衔。',
    'stats.label': '世界各地签发的护照',
    'cta.generate': '生成护照',
    'input.help': '仅限公共帐户 · 无需登录 · 不存储数据',
    'loading.analyzing': '正在分析您的线程活动...',
    'loading.subtext': '这大约需要 5-10 秒',
    'manual.title': '嗯，我们无法查看此帐户',
    'manual.desc': '也许他们正在保密——完全正确！请告诉我们一些有关您如何使用 Threads 的信息，我们将据此创建您的护照。',
    'manual.for': '护照：',
    'manual.cta': '无论如何生成我的护照',
    'manual.tryAgain': '尝试不同的用户名',
    'action.share': '分享',
    'action.download': '下载',
    'action.save': '节省',
    'action.new': '尝试另一个',
    'related.title': '探索更多',
    'how.title': '它是如何运作的',
    'how.s1.title': '输入用户名',
    'how.s1.desc': '输入您的主题@用户名。无需登录，无需密码，不收集任何个人数据。',
    'how.s2.title': '人工智能分析您的氛围',
    'how.s2.desc': '我们的人工智能会读取您的公开个人资料和发帖风格，以了解您的主题个性。',
    'how.s3.title': '发现你的国家',
    'how.s3.desc': '收到您独特的 Threads Nation、官方头衔、个性分数和 3 个特殊印章。',
    'how.s4.title': '随处分享',
    'how.s4.desc': '直接分享到 X、Instagram、WhatsApp 或 Threads——每个平台都针对该平台进行了优化。',
    'faq.title': '常见问题解答',
    'footer.tagline': 'Threads 世界公民的官方身份证件。',
    'footer.disclaimer': '仅供娱乐用途',
    'nav.privacy': '隐私',
    'nav.terms': '条款',
    'nav.cookies': '曲奇饼',
    'nav.about': '关于',
    'nav.contact': '接触',
    'about.title': '关于护照线程',
    'about.content': 'Passport Threads 是一个有趣的、讽刺性的分析工具，可以分析公共 Meta Threads 配置文件。使用人工智能分析，我们生成一个幽默的身份护照，详细说明您的“线程国家”、自定义标题和有趣的个性分数。本网站仅为娱乐目的而创建，与 Meta 或 Threads 无关。我们不会存储您的任何个人详细信息或个人资料元数据。',
    'contact.title': '联系我们',
    'contact.content': '有疑问、建议，或者只是想发送反馈？我们很乐意听取您的意见！\n\n电子邮件：contact@threadspassport.fun',
    'cookie.banner.text': '我们使用 cookie 来个性化内容、广告并分析 Google AdSense 的流量。',
    'cookie.banner.accept': '接受',
    'share.title': '分享您的护照',
    'share.subtitle': '图像会针对每个平台自动调整大小',
    'share.copy': '复制链接',
    'share.download': '下载PNG',
    'share.fullres': '全分辨率',
    'faq': [
      { q: '免费吗？', a: '是的，完全免费。无需登录或帐户连接。' },
      { q: '你们存储我的数据吗？', a: '不会。您的个人资料数据仅在处理过程中用于构建护照卡，并且绝不会存储在我们的服务器上。' },
      { q: '为什么需要我的用户名？', a: '我们阅读您的公共线程帐户的公共元数据和最近的帖子，以分析您的写作风格。' },
      { q: '我可以为别人生成护照吗？', a: '是的，只要他们的 Threads 帐户是公开的。' },
      { q: '手动模式如何工作？', a: '如果您的帐户是私人帐户，您可以写下您的在线行为的简短描述，我们的人工智能会对此进行处理。' }
    ]
  },
  ar: {
    'nav.home': 'بيت',
    'nav.blog': 'مدونة',
    'hero.badge': '✨ مجاني · لا يوجد تسجيل دخول · فوري',
    'hero.title.line1': 'اكتشف الخاص بك',
    'hero.title.line2': 'أمة المواضيع',
    'hero.subtitle': 'أدخل اسم مستخدم المواضيع الخاص بك. يكشف الذكاء الاصطناعي الخاص بنا عن Threads Nation السرية الخاصة بك، ونتائج شخصيتك، والمسمى الوظيفي الرسمي (الساخر).',
    'stats.label': 'جوازات السفر الصادرة في جميع أنحاء العالم',
    'cta.generate': 'إنشاء جواز السفر',
    'input.help': 'الحسابات العامة فقط · لا يلزم تسجيل الدخول · البيانات غير مخزنة',
    'loading.analyzing': 'جارٍ تحليل نشاط المواضيع...',
    'loading.subtext': 'يستغرق هذا حوالي 5-10 ثواني',
    'manual.title': 'حسنًا، لم نتمكن من إلقاء نظرة خاطفة على هذا الحساب',
    'manual.desc': 'ربما يبقونها خاصة – صالحة تمامًا! أخبرنا قليلاً عن كيفية استخدامك لـ Threads بدلاً من ذلك، وسنقوم بإنشاء جواز سفرك بناءً على ذلك.',
    'manual.for': 'جواز سفر لـ:',
    'manual.cta': 'إنشاء جواز السفر الخاص بي على أي حال',
    'manual.tryAgain': 'حاول استخدام اسم مستخدم مختلف',
    'action.share': 'يشارك',
    'action.download': 'تحميل',
    'action.save': 'يحفظ',
    'action.new': 'حاول آخر',
    'related.title': 'اكتشف المزيد',
    'how.title': 'كيف يعمل',
    'how.s1.title': 'أدخل اسم المستخدم',
    'how.s1.desc': 'اكتب مواضيعك @اسم المستخدم. لا يوجد تسجيل دخول ولا كلمة مرور ولا يتم جمع أي بيانات شخصية.',
    'how.s2.title': 'الذكاء الاصطناعي يحلل طاقتك',
    'how.s2.desc': 'يقرأ الذكاء الاصطناعي الخاص بنا ملفك الشخصي العام وأسلوب النشر لفهم شخصية المواضيع الخاصة بك.',
    'how.s3.title': 'اكتشف أمتك',
    'how.s3.desc': 'احصل على Threads Nation الفريدة الخاصة بك، واللقب الرسمي، ودرجات الشخصية، و3 طوابع خاصة.',
    'how.s4.title': 'شاركها في كل مكان',
    'how.s4.desc': 'شارك مباشرة على X أو Instagram أو WhatsApp أو Threads - كل منها مُحسّن لهذا النظام الأساسي.',
    'faq.title': 'الأسئلة المتداولة',
    'footer.tagline': 'وثيقة الهوية الرسمية لمواطني العالم.',
    'footer.disclaimer': 'لأغراض الترفيه فقط',
    'nav.privacy': 'خصوصية',
    'nav.terms': 'شروط',
    'nav.cookies': 'ملفات تعريف الارتباط',
    'nav.about': 'عن',
    'nav.contact': 'اتصال',
    'about.title': 'حول مواضيع جواز السفر',
    'about.content': 'Passport Threads هي أداة تصنيف ممتعة وساخرة تعمل على تحليل ملفات التعريف العامة لـ Meta Threads. باستخدام تحليل الذكاء الاصطناعي، نقوم بإنشاء جواز سفر هوية فكاهي يتضمن تفاصيل "Threads Nation" الخاصة بك، وعنوانًا مخصصًا، ودرجات شخصية مضحكة. تم إنشاء هذا الموقع لأغراض الترفيه فقط ولا ينتمي إلى Meta أو Threads. نحن لا نقوم بتخزين أي من بياناتك الشخصية أو البيانات الوصفية لملفك الشخصي.',
    'contact.title': 'اتصل بنا',
    'contact.content': 'هل لديك أسئلة أو اقتراحات أو تريد فقط إرسال تعليقات؟ نحن نحب أن نسمع منك!\n\nالبريد الإلكتروني: contact@threadspassport.fun',
    'cookie.banner.text': 'نحن نستخدم ملفات تعريف الارتباط لتخصيص المحتوى والإعلانات وتحليل حركة المرور إلى Google AdSense.',
    'cookie.banner.accept': 'يقبل',
    'share.title': 'شارك جواز سفرك',
    'share.subtitle': 'يتم تغيير حجم الصورة تلقائيًا لكل منصة',
    'share.copy': 'نسخ الوصلة',
    'share.download': 'تحميل PNG',
    'share.fullres': 'القرار الكامل',
    'faq': [
      { q: 'هل هو مجاني؟', a: 'نعم، مجاني تماما. لا يلزم تسجيل الدخول أو الاتصال بالحساب.' },
      { q: 'هل تقوم بتخزين بياناتي؟', a: 'لا. يتم استخدام بيانات ملفك الشخصي فقط أثناء المعالجة لإنشاء بطاقة جواز السفر ولا يتم تخزينها مطلقًا على خوادمنا.' },
      { q: 'لماذا يحتاج إلى اسم المستخدم الخاص بي؟', a: 'نحن نقرأ البيانات الوصفية العامة والمشاركات الأخيرة لحساب المواضيع العامة الخاص بك لتحليل أسلوب كتابتك.' },
      { q: 'هل يمكنني إصدار جواز سفر لشخص آخر؟', a: 'نعم، طالما أن حساب Threads الخاص بهم عام.' },
      { q: 'كيف يعمل الوضع اليدوي؟', a: 'إذا كان حسابك خاصًا، فيمكنك كتابة وصف موجز لكيفية تصرفك عبر الإنترنت، وسيقوم الذكاء الاصطناعي الخاص بنا بمعالجة ذلك بدلاً من ذلك.' }
    ]
  },
  hi: {
    'nav.home': 'घर',
    'nav.blog': 'ब्लॉग',
    'hero.badge': '✨ मुफ़्त · कोई लॉगिन नहीं · तुरंत',
    'hero.title.line1': 'अपना पता लगाएं',
    'hero.title.line2': 'थ्रेड्स नेशन',
    'hero.subtitle': 'अपना थ्रेड्स उपयोगकर्ता नाम दर्ज करें। हमारा AI आपके गुप्त थ्रेड्स नेशन, व्यक्तित्व स्कोर और आपके आधिकारिक (व्यंग्यात्मक) शीर्षक को प्रकट करता है।',
    'stats.label': 'दुनिया भर में पासपोर्ट जारी किए जाते हैं',
    'cta.generate': 'पासपोर्ट जनरेट करें',
    'input.help': 'केवल सार्वजनिक खाते · कोई लॉगिन आवश्यक नहीं · डेटा संग्रहीत नहीं है',
    'loading.analyzing': 'आपकी थ्रेड गतिविधि का विश्लेषण किया जा रहा है...',
    'loading.subtext': 'इसमें लगभग 5-10 सेकंड का समय लगता है',
    'manual.title': 'हम्म, हम इस खाते पर नज़र नहीं डाल सके',
    'manual.desc': 'शायद वे इसे निजी रख रहे हैं - पूरी तरह से वैध! इसके बजाय आप थ्रेड्स का उपयोग कैसे करते हैं, इसके बारे में हमें थोड़ा बताएं और हम उससे आपका पासपोर्ट बनाएंगे।',
    'manual.for': 'पासपोर्ट के लिए:',
    'manual.cta': 'वैसे भी मेरा पासपोर्ट जनरेट करें',
    'manual.tryAgain': 'कोई भिन्न उपयोक्तानाम आज़माएँ',
    'action.share': 'शेयर करना',
    'action.download': 'डाउनलोड करना',
    'action.save': 'बचाना',
    'action.new': 'दूसरा प्रयास करें',
    'related.title': 'और ज्यादा खोजें',
    'how.title': 'यह काम किस प्रकार करता है',
    'how.s1.title': 'उपयोगकर्ता नाम दर्ज करें',
    'how.s1.desc': 'अपना थ्रेड्स @उपयोगकर्ता नाम टाइप करें। कोई लॉगिन नहीं, कोई पासवर्ड नहीं, कोई व्यक्तिगत डेटा एकत्र नहीं किया गया।',
    'how.s2.title': 'एआई आपके वाइब का विश्लेषण करता है',
    'how.s2.desc': 'हमारा AI आपके थ्रेड्स व्यक्तित्व को समझने के लिए आपकी सार्वजनिक प्रोफ़ाइल और पोस्टिंग शैली को पढ़ता है।',
    'how.s3.title': 'अपने राष्ट्र की खोज करें',
    'how.s3.desc': 'अपना अद्वितीय थ्रेड्स नेशन, आधिकारिक शीर्षक, व्यक्तित्व स्कोर और 3 विशेष टिकटें प्राप्त करें।',
    'how.s4.title': 'इसे हर जगह साझा करें',
    'how.s4.desc': 'सीधे एक्स, इंस्टाग्राम, व्हाट्सएप या थ्रेड्स पर साझा करें - प्रत्येक उस प्लेटफ़ॉर्म के लिए अनुकूलित।',
    'faq.title': 'अक्सर पूछे जाने वाले प्रश्नों',
    'footer.tagline': 'विश्व के थ्रेड नागरिकों के लिए आधिकारिक पहचान दस्तावेज़।',
    'footer.disclaimer': 'केवल मनोरंजन प्रयोजनों के लिए',
    'nav.privacy': 'गोपनीयता',
    'nav.terms': 'शर्तें',
    'nav.cookies': 'कुकीज़',
    'nav.about': 'के बारे में',
    'nav.contact': 'संपर्क',
    'about.title': 'पासपोर्ट थ्रेड के बारे में',
    'about.content': 'पासपोर्ट थ्रेड्स एक मज़ेदार, व्यंग्यपूर्ण प्रोफ़ाइलिंग टूल है जो सार्वजनिक मेटा थ्रेड्स प्रोफ़ाइल का विश्लेषण करता है। एआई विश्लेषण का उपयोग करते हुए, हम आपके \'थ्रेड्स नेशन\', एक कस्टम शीर्षक और मज़ेदार व्यक्तित्व स्कोर का विवरण देते हुए एक विनोदी पहचान पासपोर्ट तैयार करते हैं। यह साइट केवल मनोरंजन के उद्देश्य से बनाई गई है और मेटा या थ्रेड्स से संबद्ध नहीं है। हम आपका कोई भी व्यक्तिगत विवरण या प्रोफ़ाइल मेटाडेटा संग्रहीत नहीं करते हैं।',
    'contact.title': 'हमसे संपर्क करें',
    'contact.content': 'क्या आपके कोई प्रश्न, सुझाव हैं या आप केवल प्रतिक्रिया भेजना चाहते हैं? हमें आपसे सुनना प्रिय लगेगा!\n\nईमेल: contact@threadspassport.fun',
    'cookie.banner.text': 'हम Google AdSense के लिए सामग्री, विज्ञापनों को वैयक्तिकृत करने और ट्रैफ़िक का विश्लेषण करने के लिए कुकीज़ का उपयोग करते हैं।',
    'cookie.banner.accept': 'स्वीकार करना',
    'share.title': 'अपना पासपोर्ट साझा करें',
    'share.subtitle': 'प्रत्येक प्लेटफ़ॉर्म के लिए छवि का स्वतः आकार बदला जाता है',
    'share.copy': 'लिंक की प्रतिलिपि करें',
    'share.download': 'पीएनजी डाउनलोड करें',
    'share.fullres': 'पूर्ण संकल्प',
    'faq': [
      { q: 'यह नि: शुल्क है?', a: 'हाँ, पूर्णतया निःशुल्क। कोई लॉगिन या खाता कनेक्शन आवश्यक नहीं है।' },
      { q: 'क्या आप मेरा डेटा संग्रहीत करते हैं?', a: 'नहीं, आपका प्रोफ़ाइल डेटा केवल पासपोर्ट कार्ड बनाने के लिए प्रसंस्करण के दौरान उपयोग किया जाता है और हमारे सर्वर पर कभी संग्रहीत नहीं किया जाता है।' },
      { q: 'इसे मेरे उपयोक्तानाम की आवश्यकता क्यों है?', a: 'हम आपकी लेखन शैली का विश्लेषण करने के लिए आपके सार्वजनिक थ्रेड्स खाते के सार्वजनिक मेटाडेटा और हालिया पोस्ट पढ़ते हैं।' },
      { q: 'क्या मैं किसी और के लिए पासपोर्ट बना सकता हूँ?', a: 'हाँ, जब तक उनका थ्रेड्स खाता सार्वजनिक है।' },
      { q: 'मैनुअल मोड कैसे काम करता है?', a: 'यदि आपका खाता निजी है, तो आप इसका संक्षिप्त विवरण लिख सकते हैं कि आप ऑनलाइन कैसे व्यवहार करते हैं, और इसके बजाय हमारा AI उसे रोस्ट कर देगा।' }
    ]
  }
};

const SUPPORTED_LANGS = ['en', 'fr', 'de', 'es', 'pt', 'it', 'nl', 'sv', 'no', 'da', 'pl', 'tr', 'ja', 'ko', 'zh', 'ar', 'hi', 'id'];

const BLOG_ARTICLES = {
  en: [
    { title: 'What Your Threads Posting Style Says About Your Personality', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'A deep psychological analysis of online posting vibes.' },
    { title: 'The 8 Types of Threads Users: A Complete Personality Guide', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Identify which profile archetype fits your online behavior.' },
    { title: 'How to Grow on Threads in 2026: The Algorithm Explained', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Proven audience tips for the new meta social platform.' }
  ],
  id: [
    { title: 'Apa Arti Gaya Posting Threads Terhadap Kepribadianmu', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'Analisis psikologi mendalam tentang kebiasaan mengetik di media sosial.' },
    { title: '8 Tipe Pengguna Threads: Panduan Lengkap Karakter', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Cek di mana tipe kepribadian bersosialisasi Anda berada.' },
    { title: 'Cara Mengembangkan Akun Threads di 2026: Algoritma Terbaru', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Kiat-kiat menjangkau audiens di platform Threads.' }
  ],
  fr: [
    { title: 'Ce que votre style de publication Threads dit de votre personnalité', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'Une analyse psychologique approfondie des habitudes de publication en ligne.' },
    { title: 'Les 8 types d\'utilisateurs de Threads : Guide complet de personnalité', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Identifiez quel archétype de profil correspond à votre comportement en ligne.' },
    { title: 'Comment grandir sur Threads en 2026 : L\'algorithme expliqué', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Conseils d\'audience éprouvés pour la nouvelle plateforme sociale de Meta.' }
  ],
  de: [
    { title: 'Was der Posting-Stil Ihres Threads über Ihre Persönlichkeit aussagt', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'Eine tiefgreifende psychologische Analyse der Online-Posting-Vibes.' },
    { title: 'Die 8 Arten von Thread-Benutzern: Ein vollständiger Leitfaden zur Persönlichkeit', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Identifizieren Sie, welcher Profilarchetyp zu Ihrem Online-Verhalten passt.' },
    { title: 'Wie man im Jahr 2026 auf Threads wächst: Der Algorithmus erklärt', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Bewährte Zielgruppentipps für die neue Meta-Social-Plattform.' }
  ],
  es: [
    { title: 'Lo que dice el estilo de publicación de tus hilos sobre tu personalidad', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'Un análisis psicológico profundo de las vibraciones de las publicaciones en línea.' },
    { title: 'Los 8 tipos de usuarios de hilos: una guía completa de personalidad', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Identifique qué arquetipo de perfil se adapta a su comportamiento en línea.' },
    { title: 'Cómo crecer en hilos en 2026: el algoritmo explicado', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Consejos de audiencia probados para la nueva metaplataforma social.' }
  ],
  pt: [
    { title: 'O que o estilo de postagem de seus tópicos diz sobre sua personalidade', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'Uma análise psicológica profunda das vibrações das postagens online.' },
    { title: 'Os 8 tipos de usuários de threads: um guia completo de personalidade', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Identifique qual arquétipo de perfil se adapta ao seu comportamento online.' },
    { title: 'Como crescer em threads em 2026: o algoritmo explicado', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Dicas comprovadas de público para a nova plataforma meta social.' }
  ],
  it: [
    { title: 'Cosa dice lo stile di pubblicazione dei tuoi thread sulla tua personalità', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'Una profonda analisi psicologica delle vibrazioni della pubblicazione online.' },
    { title: 'Gli 8 tipi di utenti di thread: una guida completa alla personalità', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Identifica quale archetipo di profilo si adatta al tuo comportamento online.' },
    { title: 'Come crescere sui thread nel 2026: spiegato l\'algoritmo', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Suggerimenti comprovati per il pubblico per la nuova piattaforma metasocial.' }
  ],
  nl: [
    { title: 'Wat de berichtstijl van uw threads zegt over uw persoonlijkheid', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'Een diepgaande psychologische analyse van de sfeer van online posten.' },
    { title: 'De 8 soorten Threads-gebruikers: een complete persoonlijkheidsgids', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Identificeer welk profielarchetype bij uw online gedrag past.' },
    { title: 'Hoe u in 2026 kunt groeien op basis van threads: het algoritme uitgelegd', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Bewezen publiekstips voor het nieuwe meta-sociale platform.' }
  ],
  sv: [
    { title: 'Vad dina inläggsstilar för trådar säger om din personlighet', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'En djup psykologisk analys av onlineinläggsvibbar.' },
    { title: 'De 8 typerna av trådanvändare: En komplett personlighetsguide', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Identifiera vilken profilarketyp som passar ditt onlinebeteende.' },
    { title: 'Hur man växer på trådar 2026: Algoritmen förklaras', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Beprövade publiktips för den nya sociala metaplattformen.' }
  ],
  no: [
    { title: 'Hva stilen din i trådene dine sier om personligheten din', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'En dyp psykologisk analyse av stemninger for innlegg på nett.' },
    { title: 'De 8 typene trådbrukere: En komplett personlighetsguide', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Identifiser hvilken profilarketype som passer til din nettadferd.' },
    { title: 'Hvordan vokse på tråder i 2026: Algoritmen forklart', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Påviste publikumstips for den nye meta sosiale plattformen.' }
  ],
  da: [
    { title: 'Hvad dine tråde-indlægsstil siger om din personlighed', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'En dyb psykologisk analyse af online-posting-vibes.' },
    { title: 'De 8 typer af tråde-brugere: En komplet personlighedsguide', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Identificer hvilken profilarketype, der passer til din onlineadfærd.' },
    { title: 'Sådan vokser du på tråde i 2026: Algoritmen forklaret', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Gennemprøvede publikumstip til den nye meta sociale platform.' }
  ],
  pl: [
    { title: 'Co styl publikowania postów mówi o Twojej osobowości', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'Głęboka analiza psychologiczna wibracji związanych z publikowaniem w Internecie.' },
    { title: '8 typów użytkowników wątków: kompletny przewodnik po osobowości', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Zidentyfikuj, który archetyp profilu pasuje do Twojego zachowania w Internecie.' },
    { title: 'Jak rozwijać wątki w 2026 r.: wyjaśnienie algorytmu', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Sprawdzone wskazówki dla odbiorców dotyczące nowej metaplatformy społecznościowej.' }
  ],
  tr: [
    { title: 'Konu Atma Stiliniz Kişiliğiniz Hakkında Ne Söylüyor?', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'Çevrimiçi paylaşım titreşimlerinin derin bir psikolojik analizi.' },
    { title: '8 Tür Konu Kullanıcısı: Tam Bir Kişilik Rehberi', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'Hangi profil arketipinin çevrimiçi davranışınıza uyduğunu belirleyin.' },
    { title: '2026\'da Konularda Nasıl Büyüme Sağlanır: Algoritmanın Açıklaması', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'Yeni meta sosyal platform için kanıtlanmış kitle ipuçları.' }
  ],
  ja: [
    { title: 'スレッドの投稿スタイルからわかるあなたの性格', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'ネット投稿の雰囲気を深層心理分析。' },
    { title: '8 種類のスレッド ユーザー: 完全な性格ガイド', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: '自分のオンライン行動にどのプロファイルの原型が適合するかを特定します。' },
    { title: '2026 年にスレッドで成長する方法: アルゴリズムの説明', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: '新しいメタ ソーシャル プラットフォームに関する実証済みの視聴者向けのヒント。' }
  ],
  ko: [
    { title: '귀하의 스레드 게시 스타일이 귀하의 성격에 대해 말하는 것', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: '온라인 게시 분위기에 대한 심층적인 심리 분석.' },
    { title: '스레드 사용자의 8가지 유형: 완전한 성격 가이드', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: '귀하의 온라인 행동에 적합한 프로필 유형을 식별하십시오.' },
    { title: '2026년 스레드에서 성장하는 방법: 알고리즘 설명', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: '새로운 메타 소셜 플랫폼에 대한 검증된 청중 팁.' }
  ],
  zh: [
    { title: '您的帖子发布风格反映了您的个性', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: '对网上发帖氛围的深入心理分析。' },
    { title: '8 种话题用户：完整的性格指南', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: '确定哪种个人资料原型适合您的在线行为。' },
    { title: '2026 年如何在线程上增长：算法解释', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: '针对新元社交平台的经过验证的受众提示。' }
  ],
  ar: [
    { title: 'ما يقوله أسلوب نشر مواضيعك عن شخصيتك', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'تحليل نفسي عميق لمشاعر النشر عبر الإنترنت.' },
    { title: 'الأنواع الثمانية لمستخدمي الخيوط: دليل شخصي كامل', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'حدد النموذج الأصلي للملف الشخصي الذي يناسب سلوكك عبر الإنترنت.' },
    { title: 'كيف تنمو على الخيوط في عام 2026: شرح الخوارزمية', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'نصائح للجمهور مثبتة لمنصة التواصل الاجتماعي الجديدة.' }
  ],
  hi: [
    { title: 'आपकी थ्रेड पोस्टिंग शैली आपके व्यक्तित्व के बारे में क्या कहती है', url: '/blog/what-your-threads-says-about-your-personality.html', emoji: '🧠', desc: 'ऑनलाइन पोस्टिंग वाइब्स का गहन मनोवैज्ञानिक विश्लेषण।' },
    { title: '8 प्रकार के थ्रेड उपयोगकर्ता: एक संपूर्ण व्यक्तित्व मार्गदर्शिका', url: '/blog/8-types-of-threads-users-personality-guide.html', emoji: '🎭', desc: 'पहचानें कि कौन सा प्रोफ़ाइल आदर्श आपके ऑनलाइन व्यवहार पर फिट बैठता है।' },
    { title: '2026 में धागों पर कैसे विकास करें: एल्गोरिथम की व्याख्या', url: '/blog/how-to-grow-on-threads-2026-algorithm-explained.html', emoji: '📈', desc: 'नए मेटा सोशल प्लेटफॉर्म के लिए सिद्ध दर्शक युक्तियाँ।' }
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
  try {
    const saved = localStorage.getItem('pt_lang');
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  } catch (err) {
    console.warn('localStorage is disabled or not accessible:', err);
  }

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
      try {
        localStorage.setItem('pt_lang', selected);
      } catch (err) {
        console.warn('Unable to save language preference to localStorage:', err);
      }
      
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

window.PT_LANG = detectUserLanguage() || 'en';
applyTranslations(window.PT_LANG);

// Safe binding for setupLanguageSelector in case DOMContentLoaded has already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupLanguageSelector);
} else {
  setupLanguageSelector();
}
