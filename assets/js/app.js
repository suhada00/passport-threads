/* assets/js/app.js */
/* Main App Controller — Coordinates state changes, text input validation, API execution, and confetti effects */

// Force unregister service worker and clear caches to ensure updates are served immediately
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const reg of registrations) {
      reg.unregister().then(() => console.log('[Dev] SW unregistered'));
    }
  });
  if (window.caches) {
    caches.keys().then(names => {
      for (const name of names) {
        caches.delete(name).then(() => console.log('[Dev] Cache cleared:', name));
      }
    });
  }
}

class App {
  constructor() {
    this.workerUrl = 'https://passport-threads-worker.workers.dev';
    if (this.isLocal()) {
      if (window.location.protocol === 'file:') {
        this.workerUrl = 'http://localhost:8001';
      } else {
        this.workerUrl = window.location.origin;
      }
    }
    
    // Core DOM Elements
    this.body = document.body;
    this.usernameInput = document.getElementById('usernameInput');
    this.generateBtnDesktop = document.getElementById('generateBtnDesktop');
    this.generateBtnMobile = document.getElementById('generateBtnMobile');
    
    this.heroSection = document.getElementById('heroSection');
    this.loadingSection = document.getElementById('loadingSection');
    this.resultSection = document.getElementById('resultSection');
    
    this.passportCard = document.getElementById('passportCard');
    this.mobileBar = document.getElementById('mobileBar');
    this.mobileCTA = document.getElementById('mobileCTA');
    this.inputError = document.getElementById('inputError');
    
    // Share Dialog (Desktop Modal)
    this.shareModal = document.getElementById('shareModal');
    this.modalClose = document.getElementById('modalClose');
    this.modalBackdrop = document.getElementById('modalBackdrop');
    
    // New Modals (About & Contact)
    this.aboutModal = document.getElementById('aboutModal');
    this.aboutBtn = document.getElementById('aboutBtn');
    this.aboutClose = document.getElementById('aboutClose');
    this.aboutBackdrop = document.getElementById('aboutBackdrop');
    
    this.contactModal = document.getElementById('contactModal');
    this.contactBtn = document.getElementById('contactBtn');
    this.contactClose = document.getElementById('contactClose');
    this.contactBackdrop = document.getElementById('contactBackdrop');
    
    // Cookie Banner
    this.cookieBanner = document.getElementById('cookieBanner');
    this.acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
    
    // Downloader DOM Elements
    this.navHome = document.getElementById('navHome');
    this.navDownloader = document.getElementById('navDownloader');
    this.downloaderSection = document.getElementById('downloaderSection');
    
    this.videoUrlInput = document.getElementById('videoUrlInput');
    this.fetchVideoBtn = document.getElementById('fetchVideoBtn');
    this.downloaderLoading = document.getElementById('downloaderLoading');
    this.downloaderResult = document.getElementById('downloaderResult');
    this.downloaderError = document.getElementById('downloaderError');
    
    this.dlVideoPlayer = document.getElementById('dlVideoPlayer');
    this.dlVideoSource = document.getElementById('dlVideoSource');
    this.dlAuthorName = document.getElementById('dlAuthorName');
    this.dlCaptionText = document.getElementById('dlCaptionText');
    this.dlDownloadBtn = document.getElementById('dlDownloadBtn');
    this.dlNewBtn = document.getElementById('dlNewBtn');
    this.dlQualitySelect = document.getElementById('dlQualitySelect');
    
    // State Values
    this.currentPassportData = null;
    this.currentVideoData = null;
    this.activeUsername = '';

    this.setupListeners();
    this.checkUrlParams();
  }

  isLocal() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' || 
           window.location.protocol === 'file:';
  }

  getEndpoint(path) {
    return this.isLocal() ? `${this.workerUrl}${path}` : path;
  }

  setupListeners() {
    // Real-time username input validation & normalization
    if (this.usernameInput) {
      this.usernameInput.addEventListener('input', () => {
        let val = this.usernameInput.value;
        
        // Auto-extract username if a full Threads URL is pasted
        if (val.includes('threads.net')) {
          const match = val.match(/threads\.net\/@?([a-zA-Z0-9._]+)/i);
          if (match && match[1]) {
            val = match[1];
            this.usernameInput.value = val;
          }
        }
        
        // Strip '@' if user typed/pasted it
        if (val.startsWith('@')) {
          val = val.substring(1);
          this.usernameInput.value = val;
        }

        // Permit alphanumeric, periods, and underscores
        const cleaned = val.replace(/[^a-zA-Z0-9._]/g, '');
        if (val !== cleaned) {
          this.usernameInput.value = cleaned;
        }

        // Enable generate buttons if text is entered
        const disabled = cleaned.trim().length === 0;
        if (this.generateBtnDesktop) this.generateBtnDesktop.disabled = disabled;
        if (this.generateBtnMobile) this.generateBtnMobile.disabled = disabled;
        
        this.hideError();
      });

      // Bind Enter key
      this.usernameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !this.generateBtnDesktop.disabled) {
          this.startGenerationFlow();
        }
      });
    }

    // Bind Desktop / Mobile generate clicks
    if (this.generateBtnDesktop) {
      this.generateBtnDesktop.addEventListener('click', () => this.startGenerationFlow());
    }
    if (this.generateBtnMobile) {
      this.generateBtnMobile.addEventListener('click', () => this.startGenerationFlow());
    }

    // Result buttons (Desktop)
    const newBtnDesktop = document.getElementById('newBtnDesktop');
    if (newBtnDesktop) newBtnDesktop.addEventListener('click', () => this.resetToIdle());

    const downloadBtnDesktop = document.getElementById('downloadBtnDesktop');
    if (downloadBtnDesktop) {
      downloadBtnDesktop.addEventListener('click', () => {
        if (this.currentPassportData) {
          window.PT_Share.handleShare('download', this.currentPassportData);
        }
      });
    }

    const shareBtnDesktop = document.getElementById('shareBtnDesktop');
    if (shareBtnDesktop) {
      shareBtnDesktop.addEventListener('click', () => this.showShareModal(true));
    }

    // Modal Events
    if (this.modalClose) this.modalClose.addEventListener('click', () => this.showShareModal(false));
    if (this.modalBackdrop) this.modalBackdrop.addEventListener('click', () => this.showShareModal(false));

    // Staging Share buttons inside modal
    document.querySelectorAll('.share-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const platform = btn.getAttribute('data-platform');
        if (platform && this.currentPassportData) {
          this.showShareModal(false);
          window.PT_Share.handleShare(platform, this.currentPassportData);
        }
      });
    });

    // Mobile Bottom Floating Bar buttons
    const mobileBtnShare = document.getElementById('mobileBtnShare');
    if (mobileBtnShare) {
      mobileBtnShare.addEventListener('click', () => {
        this.showShareModal(true);
      });
    }

    const mobileBtnDownload = document.getElementById('mobileBtnDownload');
    if (mobileBtnDownload) {
      mobileBtnDownload.addEventListener('click', () => {
        if (this.currentPassportData) {
          window.PT_Share.handleShare('download', this.currentPassportData);
        }
      });
    }

    const mobileBtnNew = document.getElementById('mobileBtnNew');
    if (mobileBtnNew) mobileBtnNew.addEventListener('click', () => this.resetToIdle());

    // About Modal Event Listeners
    if (this.aboutBtn) {
      this.aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.aboutModal) this.aboutModal.hidden = false;
      });
    }
    if (this.aboutClose) {
      this.aboutClose.addEventListener('click', () => {
        if (this.aboutModal) this.aboutModal.hidden = true;
      });
    }
    if (this.aboutBackdrop) {
      this.aboutBackdrop.addEventListener('click', () => {
        if (this.aboutModal) this.aboutModal.hidden = true;
      });
    }

    // Contact Modal Event Listeners
    if (this.contactBtn) {
      this.contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.contactModal) this.contactModal.hidden = false;
      });
    }
    if (this.contactClose) {
      this.contactClose.addEventListener('click', () => {
        if (this.contactModal) this.contactModal.hidden = true;
      });
    }
    if (this.contactBackdrop) {
      this.contactBackdrop.addEventListener('click', () => {
        if (this.contactModal) this.contactModal.hidden = true;
      });
    }

    // Cookie Banner Event Listeners & Check
    if (this.cookieBanner) {
      let consent = null;
      try {
        consent = localStorage.getItem('cookie_consent');
      } catch (err) {
        console.warn('localStorage is disabled or not accessible:', err);
      }
      if (!consent) {
        setTimeout(() => {
          if (this.cookieBanner) this.cookieBanner.hidden = false;
        }, 1500);
      }
    }
    if (this.acceptCookiesBtn) {
      this.acceptCookiesBtn.addEventListener('click', () => {
        try {
          localStorage.setItem('cookie_consent', 'accepted');
        } catch (err) {
          console.warn('Unable to save cookie consent to localStorage:', err);
        }
        if (this.cookieBanner) this.cookieBanner.hidden = true;
      });
    }

    // Downloader Navigation Tab Listeners
    if (this.navHome) {
      this.navHome.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchView('passport');
      });
    }
    if (this.navDownloader) {
      this.navDownloader.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchView('downloader');
      });
    }

    // Downloader Input Event Listener
    if (this.videoUrlInput) {
      this.videoUrlInput.addEventListener('input', () => {
        const val = this.videoUrlInput.value.trim();
        const isValid = val.includes('threads.net');
        if (this.fetchVideoBtn) this.fetchVideoBtn.disabled = !isValid;
        if (this.downloaderError) this.downloaderError.setAttribute('hidden', '');
      });

      this.videoUrlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && this.fetchVideoBtn && !this.fetchVideoBtn.disabled) {
          this.startVideoFetchFlow();
        }
      });
    }

    // Downloader Fetch Button Event Listener
    if (this.fetchVideoBtn) {
      this.fetchVideoBtn.addEventListener('click', () => {
        this.startVideoFetchFlow();
      });
    }

    // Downloader Reset/New Button Event Listener
    if (this.dlNewBtn) {
      this.dlNewBtn.addEventListener('click', () => {
        if (this.videoUrlInput) this.videoUrlInput.value = '';
        if (this.fetchVideoBtn) this.fetchVideoBtn.disabled = true;
        if (this.downloaderResult) this.downloaderResult.setAttribute('hidden', '');
        if (this.downloaderError) this.downloaderError.setAttribute('hidden', '');
        if (this.dlVideoPlayer) {
          this.dlVideoPlayer.pause();
          if (this.dlVideoSource) this.dlVideoSource.src = '';
        }
      });
    }

    // Downloader Download Button Event Listener
    if (this.dlDownloadBtn) {
      this.dlDownloadBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (!this.currentVideoData) return;
        
        const quality = this.dlQualitySelect ? this.dlQualitySelect.value : 'hd';
        const videoUrl = quality === 'sd' ? this.currentVideoData.videoUrlSD : this.currentVideoData.videoUrlHD;
        const downloadUrl = this.getEndpoint(`/api/download-video?url=${encodeURIComponent(videoUrl)}`);
        
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        
        if (isIOS && navigator.share) {
          try {
            window.PT_Share.showToast('Menyiapkan video untuk iOS... ⏳', 5000);
            const res = await fetch(downloadUrl);
            if (!res.ok) throw new Error('Gagal mengambil file video.');
            const blob = await res.blob();
            const file = new File([blob], 'threads-video.mp4', { type: 'video/mp4' });
            
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              await navigator.share({
                files: [file],
                title: 'Threads Video'
              });
            } else {
              window.open(downloadUrl, '_blank');
            }
          } catch (err) {
            console.error('Web Share failed, opening URL instead:', err);
            window.open(downloadUrl, '_blank');
          }
        } else {
          // Android/Desktop standard file download
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = `threads-video-${Date.now()}.mp4`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      });
    }
  }

  // Check URL parameters for direct passport links (?u=username)
  checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const u = params.get('u');
    if (u) {
      const clean = u.replace(/^@/, '').trim().replace(/[^a-zA-Z0-9._]/g, '');
      if (clean) {
        if (this.usernameInput) this.usernameInput.value = clean;
        setTimeout(() => this.startGenerationFlow(clean), 500);
      }
    }
  }

  // Core Orchestration Flow
  async startGenerationFlow(forcedUsername = null) {
    const username = forcedUsername || this.usernameInput.value.trim();
    if (!username) return;

    this.activeUsername = username;
    this.hideError();

    // 1. Enter LOADING state
    this.body.className = 'state-loading';
    this.heroSection.setAttribute('hidden', '');
    this.loadingSection.removeAttribute('hidden');
    if (this.mobileCTA) this.mobileCTA.style.display = 'none';

    // Start loading logs
    window.PassportPreview.startProgressAnimation();

    let profileData = null;

    // 2. Fetch profile data (scraping step)
    try {
      const fetchRes = await fetch(this.getEndpoint('/api/fetch-profile'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (fetchRes.ok) {
        profileData = await fetchRes.json();
        // Populate preview layout structures immediately with scraped details
        window.PassportPreview.populate({
          username: profileData.username,
          name: profileData.displayName,
          avatar: profileData.profilePicUrl
        });
      } else {
        const errData = await fetchRes.json();
        if (errData.code === 'PROFILE_PRIVATE' || errData.code === 'PROFILE_NOT_FOUND') {
          this.triggerManualMode();
          return;
        }
        this.showError(errData.error || 'Failed to fetch profile.');
        this.resetToIdle();
        return;
      }
    } catch (err) {
      console.error('Fetch profile failed:', err);
      this.showError('A network error occurred. Please try again.');
      this.resetToIdle();
      return;
    }

    // 3. Request AI generation based on fetched profile data
    try {
      const analyzeRes = await fetch(this.getEndpoint('/api/analyze-profile'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: profileData.username,
          displayName: profileData.displayName,
          profilePicUrl: profileData.profilePicUrl,
          bio: profileData.bio,
          recentPostsText: profileData.recentPostsText,
          lang: window.PT_LANG || 'en'
        })
      });

      if (analyzeRes.ok) {
        const resultData = await analyzeRes.json();
        this.currentPassportData = resultData;
        this.displaySuccess(resultData);
      } else {
        const errData = await analyzeRes.json();
        if (errData.code === 'RATE_LIMITED') {
          this.showError(errData.error || 'Too many requests. Please try again in a minute.');
        } else {
          this.showError(errData.error || 'Failed to analyze profile.');
        }
        this.resetToIdle();
      }
    } catch (err) {
      console.error('Analysis failed:', err);
      this.showError('A network error occurred. Please try again.');
      this.resetToIdle();
    }
  }

  async generatePassport(username, manualBio = null) {
    // If coming from manual submit, enter loading state from manual view
    if (manualBio) {
      this.body.className = 'state-loading';
      this.loadingSection.removeAttribute('hidden');
      window.PassportPreview.startProgressAnimation();
      window.PassportPreview.populate({ username, name: username, avatar: null });
    }

    try {
      const analyzeRes = await fetch(this.getEndpoint('/api/analyze-profile'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          lang: window.PT_LANG || 'en',
          manualBio
        })
      });

      if (analyzeRes.ok) {
        const resultData = await analyzeRes.json();
        this.currentPassportData = resultData;
        this.displaySuccess(resultData);
      } else {
        const errData = await analyzeRes.json();
        if (errData.code === 'RATE_LIMITED') {
          this.showError(errData.error || 'Too many requests. Please try again in a minute.');
          this.resetToIdle();
        } else {
          this.triggerManualMode();
        }
      }
    } catch (err) {
      console.error('Generation call error:', err);
      this.showError('A network error occurred. Please try again.');
      this.resetToIdle();
    }
  }

  // Display Generated Passport & updates layouts
  displaySuccess(data) {
    window.PassportPreview.resetProgress();
    window.PassportPreview.setProgress(100);

    setTimeout(() => {
      // Hide loader, render results
      this.loadingSection.setAttribute('hidden', '');
      this.resultSection.removeAttribute('hidden');
      
      this.body.className = 'state-success has-mobile-bar';
      if (this.mobileBar) this.mobileBar.removeAttribute('hidden');

      // Draw passport card
      window.PassportRender.render(this.passportCard, data);

      // Scroll smoothly to result
      this.resultSection.scrollIntoView({ behavior: 'smooth' });

      // Update URL query parameters silently
      const newUrl = `${window.location.origin}${window.location.pathname}?u=${encodeURIComponent(data.profile.username)}`;
      window.history.pushState({ path: newUrl }, '', newUrl);

      // Play Confetti
      this.launchConfetti();

      // Render and upload passport image in the background for dynamic Open Graph card preview
      this.uploadPassportImage(data);
    }, 400);
  }

  async uploadPassportImage(data) {
    try {
      if (!window.PT_Share || !window.PT_Share.renderPassportToBlob) return;
      const blob = await window.PT_Share.renderPassportToBlob('threads', data);
      
      const res = await fetch('/api/upload-passport', {
        method: 'POST',
        headers: {
          'Content-Type': 'image/png',
          'x-username': data.profile.username
        },
        body: blob
      });
      if (res.ok) {
        console.log('Passport image uploaded successfully for dynamic OG preview.');
      } else {
        console.warn('Failed to upload passport image for dynamic OG preview.');
      }
    } catch (err) {
      console.warn('Error uploading passport image:', err);
    }
  }

  triggerManualMode() {
    window.PassportPreview.resetProgress();
    this.loadingSection.setAttribute('hidden', '');
    this.body.className = 'state-manual';
    window.ManualMode.show(this.activeUsername);
  }

  resetToIdle() {
    window.PassportPreview.resetProgress();
    window.ManualMode.hide();
    
    this.currentPassportData = null;
    this.activeUsername = '';
    
    if (this.usernameInput) this.usernameInput.value = '';
    if (this.generateBtnDesktop) this.generateBtnDesktop.disabled = true;
    if (this.generateBtnMobile) this.generateBtnMobile.disabled = true;

    // Reset layout view
    this.resultSection.setAttribute('hidden', '');
    this.loadingSection.setAttribute('hidden', '');
    if (this.mobileBar) this.mobileBar.setAttribute('hidden', '');
    
    this.heroSection.removeAttribute('hidden');
    this.body.className = 'state-idle';

    if (window.innerWidth < 768) {
      if (this.mobileCTA) this.mobileCTA.style.display = 'block';
      this.body.classList.add('has-mobile-cta');
    }

    // Remove query params silently
    const cleanUrl = `${window.location.origin}${window.location.pathname}`;
    window.history.pushState({ path: cleanUrl }, '', cleanUrl);

    // Refocus input box
    if (window.innerWidth > 768 && this.usernameInput) {
      this.usernameInput.focus();
    }
  }

  showShareModal(show) {
    if (!this.shareModal) return;
    this.shareModal.hidden = !show;
  }

  showError(msg) {
    if (this.inputError) {
      this.inputError.textContent = msg;
      this.inputError.removeAttribute('hidden');
    }
  }

  hideError() {
    if (this.inputError) {
      this.inputError.setAttribute('hidden', '');
    }
  }

  // Premium Custom JavaScript Confetti particle effect
  launchConfetti() {
    const wrap = document.getElementById('confettiWrap');
    if (!wrap) return;

    wrap.innerHTML = '';
    const colors = ['#e94560', '#7c3aed', '#f5a623', '#10b981', '#60a5fa'];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.style.position = 'absolute';
      p.style.width = `${Math.random() * 8 + 6}px`;
      p.style.height = `${Math.random() * 8 + 6}px`;
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.borderRadius = '20%';
      p.style.top = '-10px';
      
      const left = Math.random() * 100;
      p.style.left = `${left}%`;
      
      // Random animations
      const duration = Math.random() * 1.5 + 1.5;
      const rotate = Math.random() * 360;
      
      p.style.opacity = '1';
      p.style.transition = `transform ${duration}s linear, opacity ${duration}s ease-out`;
      
      wrap.appendChild(p);

      // Force layout reflow to trigger transition
      p.offsetHeight;

      const destX = (Math.random() - 0.5) * 200;
      const destY = window.innerHeight * 0.8;

      p.style.transform = `translate(${destX}px, ${destY}px) rotate(${rotate}deg)`;
      p.style.opacity = '0';
    }

    // Clean particles after animations complete
    setTimeout(() => {
      wrap.innerHTML = '';
    }, 3500);
  }

  // ── Video Downloader Controller Helper Methods ──
  switchView(viewName) {
    if (viewName === 'downloader') {
      if (this.navHome) this.navHome.classList.remove('nav-link--active');
      if (this.navDownloader) this.navDownloader.classList.add('nav-link--active');
      
      if (this.heroSection) this.heroSection.setAttribute('hidden', '');
      if (this.loadingSection) this.loadingSection.setAttribute('hidden', '');
      if (this.manualSection) this.manualSection.setAttribute('hidden', '');
      if (this.resultSection) this.resultSection.setAttribute('hidden', '');
      if (this.mobileCTA) this.mobileCTA.style.display = 'none';
      if (this.mobileBar) this.mobileBar.setAttribute('hidden', '');
      
      if (this.downloaderSection) this.downloaderSection.removeAttribute('hidden');
    } else {
      if (this.navHome) this.navHome.classList.add('nav-link--active');
      if (this.navDownloader) this.navDownloader.classList.remove('nav-link--active');
      
      if (this.downloaderSection) this.downloaderSection.setAttribute('hidden', '');
      
      this.resetToIdle();
    }
  }

  async startVideoFetchFlow() {
    const url = this.videoUrlInput.value.trim();
    if (!url) return;

    if (this.downloaderLoading) this.downloaderLoading.removeAttribute('hidden');
    if (this.downloaderResult) this.downloaderResult.setAttribute('hidden', '');
    if (this.downloaderError) this.downloaderError.setAttribute('hidden', '');
    if (this.fetchVideoBtn) this.fetchVideoBtn.disabled = true;

    try {
      const res = await fetch(this.getEndpoint('/api/fetch-video'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        this.currentVideoData = data;
        
        if (this.dlVideoPlayer && this.dlVideoSource) {
          const proxiedDownloadUrl = this.getEndpoint(`/api/download-video?url=${encodeURIComponent(data.videoUrlHD)}`);
          
          this.dlVideoSource.src = proxiedDownloadUrl;
          this.dlVideoPlayer.load();
        }
        
        if (this.dlAuthorName) this.dlAuthorName.textContent = data.author || 'Threads User';
        if (this.dlCaptionText) this.dlCaptionText.textContent = data.caption || '';
        
        if (this.downloaderResult) this.downloaderResult.removeAttribute('hidden');
      } else {
        throw new Error(data.error || 'Failed to retrieve video details.');
      }
    } catch (err) {
      console.error(err);
      if (this.downloaderError) {
        this.downloaderError.textContent = err.message || 'An error occurred. Please check the URL and try again.';
        this.downloaderError.removeAttribute('hidden');
      }
    } finally {
      if (this.downloaderLoading) this.downloaderLoading.setAttribute('hidden', '');
      if (this.fetchVideoBtn) this.fetchVideoBtn.disabled = false;
    }
  }
}

// Instantiate and bind Controller on page load
window.addEventListener('load', () => {
  window.AppController = new App();
  
  // Set initial body responsive class values
  if (window.innerWidth < 768 && document.body.className === 'state-idle') {
    document.body.classList.add('has-mobile-cta');
  }
});
