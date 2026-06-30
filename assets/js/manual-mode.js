/* assets/js/manual-mode.js */
/* Fallback Manual Mode Controller for private or missing profiles */

class ManualMode {
  constructor() {
    this.section = document.getElementById('manualSection');
    this.textarea = document.getElementById('manualBioInput');
    this.charCount = document.getElementById('manualCharCount');
    this.generateBtn = document.getElementById('generateManualBtn');
    this.usernameLabel = document.getElementById('manualUsername');
    this.tryAgainBtn = document.getElementById('tryAgainBtn');
    
    this.username = '';
    this.setupListeners();
  }

  show(username) {
    this.username = username;
    if (this.usernameLabel) {
      this.usernameLabel.textContent = `@${username}`;
    }
    if (this.textarea) {
      this.textarea.value = '';
    }
    if (this.charCount) {
      this.charCount.textContent = '0';
    }
    if (this.generateBtn) {
      this.generateBtn.disabled = true;
    }
    if (this.section) {
      this.section.removeAttribute('hidden');
      this.section.style.display = 'block';
    }
    
    // Smooth scroll to manual form
    this.section.scrollIntoView({ behavior: 'smooth' });
  }

  hide() {
    if (this.section) {
      this.section.setAttribute('hidden', '');
      this.section.style.display = 'none';
    }
  }

  setupListeners() {
    if (this.textarea) {
      this.textarea.addEventListener('input', () => {
        const len = this.textarea.value.length;
        if (this.charCount) {
          this.charCount.textContent = len;
        }
        if (this.generateBtn) {
          // Require at least 15 characters to make analysis somewhat meaningful
          this.generateBtn.disabled = len < 15;
        }
      });
    }

    if (this.tryAgainBtn) {
      this.tryAgainBtn.addEventListener('click', () => {
        this.hide();
        // Trigger controller return to search state
        if (window.AppController) {
          window.AppController.resetToIdle();
        }
      });
    }

    if (this.generateBtn) {
      this.generateBtn.addEventListener('click', () => {
        const bioText = this.textarea.value.trim();
        if (bioText.length >= 15 && window.AppController) {
          this.hide();
          window.AppController.generatePassport(this.username, bioText);
        }
      });
    }
  }
}

window.ManualMode = new ManualMode();
