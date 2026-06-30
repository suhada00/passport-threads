/* assets/js/preview.js */
/* Instant preview controller — displays name, avatar, and loading text logs while processing */

class PassportPreview {
  constructor() {
    this.progressBar = document.getElementById('progressBar');
    this.loadingText = document.getElementById('loadingText');
    this.previewAvatar = document.getElementById('previewAvatar');
    this.previewAvatarSkeleton = document.getElementById('previewAvatarSkeleton');
    this.previewName = document.getElementById('previewName');
    this.previewUsername = document.getElementById('previewUsername');
    
    this.fakeProgressInterval = null;
    this.fakeTextInterval = null;
    this.progressVal = 0;
  }

  // Starts fake progress logging
  startProgressAnimation() {
    this.resetProgress();
    
    const logs = [
      "Scanning your Threads activity...",
      "Analyzing your personality patterns...",
      "Consulting the Passport Bureau...",
      "Stamping your passport...",
      "Almost done! Adding final touches..."
    ];

    let logIndex = 0;
    this.loadingText.textContent = logs[0];

    // Update text messages every 2.5s
    this.fakeTextInterval = setInterval(() => {
      logIndex = Math.min(logIndex + 1, logs.length - 1);
      this.loadingText.textContent = logs[logIndex];
    }, 2500);

    // Dynamic fake progress increments
    this.fakeProgressInterval = setInterval(() => {
      if (this.progressVal < 90) {
        // Slows down as it approaches 90%
        const increment = Math.max(1, Math.floor((90 - this.progressVal) / 10));
        this.progressVal += increment;
        this.setProgress(this.progressVal);
      }
    }, 400);
  }

  setProgress(val) {
    this.progressVal = val;
    if (this.progressBar) {
      this.progressBar.style.width = `${val}%`;
      this.progressBar.closest('.progress-wrap')?.setAttribute('aria-valuenow', val);
    }
  }

  resetProgress() {
    clearInterval(this.fakeProgressInterval);
    clearInterval(this.fakeTextInterval);
    this.progressVal = 0;
    this.setProgress(0);
  }

  // Populate preview card fields immediately after basic scraper responds
  populate(previewData) {
    if (!previewData) return;

    if (this.previewUsername) {
      this.previewUsername.textContent = `@${previewData.username}`;
    }

    if (this.previewName) {
      this.previewName.textContent = previewData.name || previewData.username;
    }

    if (this.previewAvatar && previewData.avatar) {
      this.previewAvatar.src = previewData.avatar;
      this.previewAvatar.alt = `${previewData.username}'s avatar`;
      
      this.previewAvatar.onload = () => {
        this.previewAvatar.style.display = 'block';
        if (this.previewAvatarSkeleton) {
          this.previewAvatarSkeleton.style.display = 'none';
        }
      };
      
      // Fallback for avatar load error
      this.previewAvatar.onerror = () => {
        this.previewAvatar.style.display = 'none';
        if (this.previewAvatarSkeleton) {
          this.previewAvatarSkeleton.style.display = 'block';
          this.previewAvatarSkeleton.textContent = '👤';
          this.previewAvatarSkeleton.style.fontSize = '40px';
          this.previewAvatarSkeleton.style.textAlign = 'center';
          this.previewAvatarSkeleton.style.lineHeight = '90px';
        }
      };
    } else {
      // Default fallback avatar display if profile has no avatar
      if (this.previewAvatar) this.previewAvatar.style.display = 'none';
      if (this.previewAvatarSkeleton) {
        this.previewAvatarSkeleton.style.display = 'block';
        this.previewAvatarSkeleton.textContent = '👤';
      }
    }
  }
}

window.PassportPreview = new PassportPreview();
