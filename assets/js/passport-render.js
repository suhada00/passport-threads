/* assets/js/passport-render.js */
/* Renders the passport identity data page and passport card details into the DOM */

class PassportRender {
  render(targetEl, data) {
    if (!targetEl || !data) return;

    // Resolve Geo theme classes
    const countryCode = data.country || 'US';
    const geoTheme = window.getGeoTheme ? window.getGeoTheme(countryCode) : { flag: '🌍', passportStyle: 'default' };
    const passportStyleClass = `passport-card--${geoTheme.passportStyle}`;
    
    // Clear and set styles
    targetEl.className = `passport-card ${passportStyleClass}`;
    
    const profile = data.profile || {};
    const passport = data.passport || {};
    
    const activeLang = window.PT_LANG || 'en';
    const dict = (window.CARD_TRANSLATIONS && window.CARD_TRANSLATIONS[activeLang]) || {
      docType: "PASSPORT",
      name: "NAME",
      username: "USERNAME",
      nation: "THREADS NATION",
      title: "OFFICIAL TITLE",
      metrics: "PERSONALITY METRICS",
      stamps: "VISA STAMPS"
    };

    const scores = passport.scores || {
      asbun: 50, sinis: 50, wholesome: 50, chaos: 50, baper: 50,
      receh: 50, halu: 50, fomo: 50, caper: 50, healing: 50
    };
    const stamps = passport.stamps || ['Chronically Online', 'Thread Veteran', 'Scroll Survivor'];
    const pNumber = passport.passportNumber || 'PT0000000';

    // Build photo element or placeholder
    let photoHtml = '<div class="pp-photo-skeleton">👤</div>';
    if (profile.avatar) {
      photoHtml = `<img class="pp-photo" src="${profile.avatar}" alt="${profile.username}'s photo" width="90" height="90">`;
    }

    // Build progress bars for 10 scores
    const scoreEmojis = {
      asbun: '🗣️',
      sinis: '😒',
      wholesome: '🌸',
      chaos: '🌪️',
      baper: '🥺',
      receh: '😆',
      halu: '🔮',
      fomo: '👀',
      caper: '📣',
      healing: '🌿'
    };

    const scoresHtml = Object.keys(scores).map(key => {
      const val = scores[key];
      const emoji = scoreEmojis[key] || '📊';
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      return `
        <div class="score-row">
          <span class="score-name">${emoji} ${capitalizedKey}</span>
          <div class="score-track">
            <div class="score-bar" style="width: ${val}%;"></div>
          </div>
          <span class="score-num">${val}</span>
        </div>
      `;
    }).join('');

    // Build visa stamps
    const stampsHtml = stamps.map(stamp => `
      <span class="visa-stamp">${stamp}</span>
    `).join('');

    // Build MRZ (Machine Readable Zone) lines
    const mrzUsername = (profile.username || 'USER').toUpperCase().padEnd(15, '<').substring(0, 15);
    const mrzName = (profile.name || 'NAME').toUpperCase().replace(/[^A-Z]/g, '<').padEnd(15, '<').substring(0, 15);
    const mrzLine1 = `P<THR${mrzUsername}<<${mrzName}`;
    const mrzLine2 = `${pNumber}<<${countryCode}<<<<<<<<<<<<<<<<<<<`;

    // Inject final passport cover and data details
    targetEl.innerHTML = `
      <!-- Header -->
      <div class="pp-header">
        <div class="pp-header-left">
          <span class="pp-country-name">${passport.nation.toUpperCase()}</span>
          <span class="pp-doc-type">${dict.docType.toUpperCase()}</span>
        </div>
        <div class="pp-header-right">
          <span style="font-size: 20px;">${geoTheme.flag}</span>
          <div class="pp-emblem">🛂</div>
        </div>
      </div>

      <!-- Identity page -->
      <div class="pp-identity">
        <div class="pp-photo-wrap">
          ${photoHtml}
        </div>
        <div class="pp-identity-details">
          <div class="pp-field">
            <span class="pp-field-label">${dict.name.toUpperCase()}</span>
            <span class="pp-field-value">${profile.name || profile.username}</span>
          </div>
          <div class="pp-field">
            <span class="pp-field-label">${dict.username.toUpperCase()}</span>
            <span class="pp-field-value pp-username">@${profile.username}</span>
          </div>
        </div>
      </div>

      <!-- Threads Nation Title -->
      <div class="pp-nation">
        <span class="pp-field-label">${dict.nation.toUpperCase()}</span>
        <div class="pp-nation-value">
          <span>${passport.nation}</span>
        </div>
      </div>

      <!-- Satirical Title -->
      <div class="pp-field">
        <span class="pp-field-label">${dict.title.toUpperCase()}</span>
        <span class="pp-field-value" style="font-family: var(--font-passport); font-style: italic; font-weight: 800; color: var(--color-primary); font-size: var(--font-size-base);">
          "${passport.title}"
        </span>
      </div>

      <!-- Scores -->
      <div class="pp-scores">
        <span class="pp-field-label">${dict.metrics.toUpperCase()}</span>
        <div class="pp-score-list">
          ${scoresHtml}
        </div>
      </div>

      <!-- Stamp badges -->
      <div class="pp-stamps-section">
        <span class="pp-field-label">${dict.stamps.toUpperCase()}</span>
        <div class="pp-stamps-grid">
          ${stampsHtml}
        </div>
      </div>

      <!-- Roast Summary -->
      <div class="pp-field" style="margin-top: 4px; padding-bottom: 6px; border-bottom: none; font-size: var(--font-size-xs); line-height: 1.4; font-style: italic; text-align: center; color: var(--color-text-muted);">
        "${passport.bio_summary}"
      </div>

      <!-- Footer MRZ -->
      <div class="pp-footer">
        <div class="mrz-line">${mrzLine1}</div>
        <div class="mrz-line">${mrzLine2}</div>
      </div>
    `;

    // Trigger score transition width animations after DOM rendering
    setTimeout(() => {
      targetEl.querySelectorAll('.score-bar').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        // Force reflow
        bar.offsetHeight;
        bar.style.width = width;
      });
    }, 100);
  }
}

window.PassportRender = new PassportRender();
