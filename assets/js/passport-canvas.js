/* assets/js/passport-canvas.js */
/* High-performance off-screen Canvas exporter. Draws the custom passport card and background layouts to PNG blobs */

class PassportCanvas {
  render(width, height, data) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      const profile = data.profile || {};
      const passport = data.passport || {};
      
      // Get Geo theme for the background pattern
      const countryCode = passport.country || 'US';
      const geoTheme = window.getGeoTheme ? window.getGeoTheme(countryCode) : { flag: '🌍', passportStyle: 'default' };
      const bgStyle = geoTheme.passportStyle || 'default';
      
      // Load images
      let loadedCount = 0;
      const totalImages = profile.avatar ? 2 : 1;
      
      const avatarImg = new Image();
      avatarImg.crossOrigin = 'anonymous';
      
      const bgPatternImg = new Image();
      bgPatternImg.crossOrigin = 'anonymous';
      
      const proceedDrawing = () => {
        // Draw the passport card filling the entire canvas
        this.drawPassportCard(ctx, 0, 0, width, height, profile, passport, avatarImg, bgPatternImg);

        // Resolve canvas to Blob
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };
      
      const checkLoaded = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          proceedDrawing();
        }
      };

      // Load background pattern SVG
      bgPatternImg.src = `/assets/img/passport-bg/${bgStyle}.svg`;
      bgPatternImg.onload = checkLoaded;
      bgPatternImg.onerror = () => {
        console.warn('Background pattern SVG failed to load.');
        checkLoaded();
      };

      // Load avatar image if available
      if (profile.avatar) {
        const proxyUrl = window.AppController 
          ? window.AppController.getEndpoint('/api/image-proxy?url=' + encodeURIComponent(profile.avatar)) 
          : '/api/image-proxy?url=' + encodeURIComponent(profile.avatar);
        
        avatarImg.src = proxyUrl;
        avatarImg.onload = checkLoaded;
        avatarImg.onerror = () => {
          console.warn('Avatar image failed to load in canvas, drawing default avatar placeholder.');
          checkLoaded();
        };
      }
    });
  }

  // Draw core passport card structure
  drawPassportCard(ctx, x, y, w, h, profile, passport, avatarImg, bgPatternImg) {
    ctx.save();
    
    // Draw card container
    const isFullCanvas = (x === 0 && y === 0);
    const scale = w / 520;
    
    if (!isFullCanvas) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 15;
    }
    
    ctx.fillStyle = '#fdfbf7'; // Passport textured paper color
    if (isFullCanvas) {
      ctx.fillRect(x, y, w, h);
    } else {
      this.roundRect(ctx, x, y, w, h, Math.round(20 * scale));
      ctx.fill();
    }
    
    if (!isFullCanvas) {
      ctx.shadowColor = 'transparent'; // Reset shadow
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#d4c5b3';
      ctx.stroke();
    }

    // Draw background pattern if loaded
    if (bgPatternImg && bgPatternImg.complete && bgPatternImg.naturalWidth !== 0) {
      ctx.save();
      if (isFullCanvas) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();
      } else {
        this.roundRect(ctx, x, y, w, h, Math.round(20 * scale));
        ctx.clip();
      }
      ctx.globalAlpha = 0.08;
      ctx.drawImage(bgPatternImg, x, y, w, h);
      ctx.restore();
    }

    // Draw passport inner margins
    const margin = w * 0.05;
    const innerX = x + margin;
    const innerY = y + margin;
    const innerW = w - (margin * 2);

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

    // ── HEADER ──
    ctx.fillStyle = '#1a1a2e';
    ctx.font = `bold ${Math.floor(w * 0.055)}px "Playfair Display", Georgia, serif`;
    ctx.textAlign = 'left';
    ctx.fillText(passport.nation ? passport.nation.toUpperCase() : 'THREADS NATION', innerX, innerY + (h * 0.04));

    ctx.fillStyle = '#6b7280';
    ctx.font = `bold ${Math.floor(w * 0.024)}px sans-serif`;
    ctx.fillText(dict.docType.toUpperCase(), innerX, innerY + (h * 0.075));

    ctx.font = `${Math.round(28 * scale)}px sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText('🛂', innerX + innerW, innerY + (h * 0.05));

    // Double header border
    ctx.strokeStyle = '#d4c5b3';
    ctx.lineWidth = Math.round(2 * scale);
    ctx.beginPath();
    ctx.moveTo(innerX, innerY + (h * 0.095));
    ctx.lineTo(innerX + innerW, innerY + (h * 0.095));
    ctx.stroke();

    ctx.lineWidth = Math.round(1 * scale);
    ctx.beginPath();
    ctx.moveTo(innerX, innerY + (h * 0.103));
    ctx.lineTo(innerX + innerW, innerY + (h * 0.103));
    ctx.stroke();

    // ── IDENTITY SECTION ──
    const photoSize = Math.floor(w * 0.22);
    const photoY = innerY + (h * 0.13);

    // Photo Box & Clip
    ctx.fillStyle = '#e2e8f0';
    this.roundRect(ctx, innerX, photoY, photoSize, photoSize, Math.round(8 * scale));
    ctx.fill();

    if (avatarImg && avatarImg.complete && avatarImg.naturalWidth !== 0) {
      ctx.save();
      this.roundRect(ctx, innerX, photoY, photoSize, photoSize, Math.round(8 * scale));
      ctx.clip();
      ctx.drawImage(avatarImg, innerX, photoY, photoSize, photoSize);
      ctx.restore();
    } else {
      // Draw placeholder head icon
      ctx.fillStyle = '#6b7280';
      ctx.font = `${Math.floor(photoSize * 0.6)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('👤', innerX + (photoSize / 2), photoY + (photoSize / 2));
    }

    // Name and Username details
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    // Name field
    const nameX = innerX + photoSize + (w * 0.04);
    ctx.fillStyle = '#6b7280';
    ctx.font = `bold ${Math.round(8 * scale)}px sans-serif`;
    ctx.fillText(dict.name.toUpperCase(), nameX, photoY + Math.round(12 * scale));
    
    ctx.fillStyle = '#1a1a2e';
    ctx.font = `bold ${Math.floor(w * 0.036)}px sans-serif`;
    ctx.fillText(profile.name || profile.username || 'Citizen', nameX, photoY + (h * 0.06));

    // Username field
    ctx.fillStyle = '#6b7280';
    ctx.font = `bold ${Math.round(8 * scale)}px sans-serif`;
    ctx.fillText(dict.username.toUpperCase(), nameX, photoY + (h * 0.10));
    
    ctx.fillStyle = '#e94560'; // Accent red username
    ctx.font = `bold ${Math.floor(w * 0.034)}px monospace`;
    ctx.fillText(`@${profile.username || 'username'}`, nameX, photoY + (h * 0.135));

    // ── THREADS NATION BOX ──
    const nationY = innerY + (h * 0.32);
    const nationH = h * 0.09;
    ctx.fillStyle = 'rgba(124, 58, 237, 0.06)';
    this.roundRect(ctx, innerX, nationY, innerW, nationH, Math.round(10 * scale));
    ctx.fill();
    ctx.lineWidth = Math.round(1 * scale);
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.2)';
    ctx.stroke();

    ctx.fillStyle = '#6b7280';
    ctx.font = `bold ${Math.round(8 * scale)}px sans-serif`;
    ctx.fillText(dict.nation.toUpperCase(), innerX + Math.round(12 * scale), nationY + Math.round(16 * scale));

    ctx.fillStyle = '#7c3aed';
    ctx.font = `bold ${Math.floor(w * 0.04)}px "Playfair Display", Georgia, serif`;
    ctx.fillText(passport.nation || 'Republic of Internet', innerX + Math.round(12 * scale), nationY + (nationH * 0.72));

    // ── OFFICIAL TITLE ──
    const titleY = innerY + (h * 0.44);
    ctx.fillStyle = '#6b7280';
    ctx.font = `bold ${Math.round(8 * scale)}px sans-serif`;
    ctx.fillText(dict.title.toUpperCase(), innerX, titleY);

    ctx.fillStyle = '#1a1a2e';
    ctx.font = `italic bold ${Math.floor(w * 0.036)}px "Playfair Display", Georgia, serif`;
    ctx.fillText(`"${passport.title || 'Citizen'}"`, innerX, titleY + (h * 0.04));

    // ── PERSONALITY SCORES ──
    const scoresY = innerY + (h * 0.52);
    ctx.fillStyle = '#6b7280';
    ctx.font = `bold ${Math.round(8 * scale)}px sans-serif`;
    ctx.fillText(dict.metrics.toUpperCase(), innerX, scoresY);

    const scores = passport.scores || {
      asbun: 50, sinis: 50, wholesome: 50, chaos: 50, baper: 50,
      receh: 50, halu: 50, fomo: 50, caper: 50, healing: 50
    };
    const scoreKeys = Object.keys(scores);
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

    const metricTranslations = {
      en: {
        asbun: 'Yapping',
        sinis: 'Sarcastic',
        wholesome: 'Wholesome',
        chaos: 'Chaos',
        baper: 'Sensitive',
        receh: 'Silly/Corny',
        halu: 'Delusional',
        fomo: 'FOMO',
        caper: 'Clout Chasing',
        healing: 'Vibing'
      },
      id: {
        asbun: 'Asbun',
        sinis: 'Sinis',
        wholesome: 'Wholesome',
        chaos: 'Chaos',
        baper: 'Baper',
        receh: 'Receh',
        halu: 'Halu',
        fomo: 'FOMO',
        caper: 'Caper',
        healing: 'Healing'
      }
    };
    const langMetrics = metricTranslations[activeLang] || metricTranslations.en;

    scoreKeys.forEach((key, idx) => {
      const col = Math.floor(idx / 5);
      const rowIdx = idx % 5;
      const rowY = scoresY + Math.round(14 * scale) + (rowIdx * (h * 0.038));
      const val = scores[key];
      const emoji = scoreEmojis[key] || '📊';
      const scoreLabel = langMetrics[key] || (key.charAt(0).toUpperCase() + key.slice(1));

      // Resolve Column X coordinates
      let labelX, trackX, trackW, numX;
      const colW = (innerW / 2) - (w * 0.02);

      if (col === 0) {
        labelX = innerX;
        trackX = innerX + (w * 0.20);
        trackW = colW - (w * 0.23);
        numX = innerX + colW;
      } else {
        labelX = innerX + (innerW / 2) + (w * 0.02);
        trackX = labelX + (w * 0.20);
        trackW = colW - (w * 0.23);
        numX = innerX + innerW;
      }

      // Score Name & Emoji
      ctx.fillStyle = '#1a1a2e';
      ctx.font = `bold ${Math.floor(w * 0.023)}px sans-serif`;
      ctx.fillText(`${emoji} ${scoreLabel}`, labelX, rowY + Math.round(6 * scale));

      // Score Track
      ctx.fillStyle = '#e2dcd3';
      this.roundRect(ctx, trackX, rowY, trackW, Math.round(6 * scale), Math.round(3 * scale));
      ctx.fill();

      // Score Bar Fill
      ctx.fillStyle = '#e94560';
      const fillW = trackW * (val / 100);
      if (fillW > 0) {
        this.roundRect(ctx, trackX, rowY, fillW, Math.round(6 * scale), Math.round(3 * scale));
        ctx.fill();
      }

      // Score number
      ctx.fillStyle = '#e94560';
      ctx.font = `bold ${Math.round(9 * scale)}px monospace`;
      ctx.textAlign = 'right';
      ctx.fillText(String(val), numX, rowY + Math.round(7 * scale));
      ctx.textAlign = 'left';
    });

    // ── VISA STAMPS ──
    const stampsY = innerY + (h * 0.77);
    ctx.fillStyle = '#6b7280';
    ctx.font = `bold ${Math.round(8 * scale)}px sans-serif`;
    ctx.fillText(dict.stamps.toUpperCase(), innerX, stampsY);

    const stamps = passport.stamps || ['Scroll Survivor', 'Thread Veteran', 'Overthinker'];
    const stampColors = ['#e94560', '#7c3aed', '#f5a623'];
    
    ctx.save();
    let currentStampX = innerX;
    stamps.forEach((stamp, idx) => {
      ctx.font = `${Math.round(9 * scale)}px sans-serif`;
      const textWidth = ctx.measureText(stamp).width;
      const stampW = textWidth + Math.round(12 * scale);
      const stampH = Math.round(18 * scale);

      ctx.save();
      ctx.translate(currentStampX + (stampW / 2), stampsY + Math.round(14 * scale));
      // Give stamps slight random-looking rotations
      const angle = (idx === 0) ? -0.06 : (idx === 1) ? 0.04 : -0.02;
      ctx.rotate(angle);

      // Dash Border
      ctx.strokeStyle = stampColors[idx];
      ctx.lineWidth = Math.round(1.5 * scale);
      ctx.setLineDash([3, 2]);
      this.roundRect(ctx, -stampW / 2, -stampH / 2, stampW, stampH, Math.round(4 * scale));
      ctx.stroke();

      // Text inside stamp
      ctx.fillStyle = stampColors[idx];
      ctx.font = `bold ${Math.round(8 * scale)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(stamp.toUpperCase(), 0, 0);
      
      ctx.restore();
      currentStampX += stampW + (w * 0.03);
    });
    ctx.restore();

    // ── MACHINE READABLE ZONE (MRZ) ──
    const mrzY = innerY + (h * 0.88);
    ctx.strokeStyle = '#d4c5b3';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(innerX, mrzY);
    ctx.lineTo(innerX + innerW, mrzY);
    ctx.stroke();
    ctx.setLineDash([]);

    const pNumber = passport.passportNumber || 'PT88X29KL';
    const countryCode = passport.country || 'US';
    const mrzUsername = (profile.username || 'USER').toUpperCase().padEnd(15, '<').substring(0, 15);
    const mrzName = (profile.name || 'NAME').toUpperCase().replace(/[^A-Z]/g, '<').padEnd(15, '<').substring(0, 15);
    const mrzLine1 = `P<THR${mrzUsername}<<${mrzName}`;
    const mrzLine2 = `${pNumber}<<${countryCode}<<<<<<<<<<<<<<<<<<<`;

    ctx.fillStyle = '#6b7280';
    ctx.font = `bold ${Math.floor(w * 0.023)}px monospace`;
    ctx.fillText(mrzLine1, innerX, mrzY + (h * 0.045));
    ctx.fillText(mrzLine2, innerX, mrzY + (h * 0.075));

    ctx.restore();
  }

  // Draw side text info (Twitter landscape template)
  drawSideInfo(ctx, x, y, w, h, profile, passport) {
    ctx.save();

    // Large Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 44px "Inter", sans-serif';
    ctx.fillText('My Threads Passport', x, y + 80);

    // Threads Nation
    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 24px "Inter", sans-serif';
    ctx.fillText(`Citizen of: ${passport.nation}`, x, y + 150);

    // Tagline Quote
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'italic 20px "Playfair Display", Georgia, serif';
    this.wrapText(ctx, `"${passport.tagline}"`, x, y + 230, w, 28);

    // AI Summary roasting
    ctx.fillStyle = '#9ca3af';
    ctx.font = '500 16px "Inter", sans-serif';
    this.wrapText(ctx, `Roast: ${passport.bio_summary}`, x, y + 360, w, 22);

    // Branding Domain CTA
    ctx.fillStyle = '#e94560';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('threadspassport.fun 🛂', x, y + 490);

    ctx.restore();
  }

  // Draw bottom text info (Instagram / Threads square and portrait templates)
  drawCenteredInfo(ctx, canvasWidth, yStart, profile, passport) {
    ctx.save();
    ctx.textAlign = 'center';

    // Nation title
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 24px "Inter", sans-serif';
    ctx.fillText(`I belong to the "${passport.nation}"`, canvasWidth / 2, yStart);

    // Tagline
    ctx.fillStyle = '#9ca3af';
    ctx.font = 'italic 18px "Playfair Display", Georgia, serif';
    ctx.fillText(`"${passport.tagline}"`, canvasWidth / 2, yStart + 40);

    ctx.restore();
  }

  // High-Res print info layouts
  drawDownloadInfo(ctx, canvasWidth, yStart, profile, passport) {
    ctx.save();
    ctx.textAlign = 'center';
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText('OFFICIAL THREADS IDENTITY CARD', canvasWidth / 2, yStart);

    ctx.fillStyle = '#e94560';
    ctx.font = 'bold 28px monospace';
    ctx.fillText(`DOCUMENT NO: ${passport.passportNumber}`, canvasWidth / 2, yStart + 60);

    ctx.restore();
  }

  // Helper function to draw rounded rectangles in Canvas context
  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // Helper text wrap function
  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  }
}

window.PassportCanvas = new PassportCanvas();
