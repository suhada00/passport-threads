/* assets/js/adsense.js */
/* Lazy loading loader for Google AdSense slots and script using IntersectionObserver */

document.addEventListener('DOMContentLoaded', () => {
  let scriptLoaded = false;
  
  function loadAdSenseScript() {
    if (scriptLoaded) return;
    scriptLoaded = true;
    
    // Find client ID from lazy script tag in DOM
    let clientId = 'ca-pub-XXXXXXXXXXXXXXXX';
    const lazyScript = document.querySelector('script.adsense-lazy');
    if (lazyScript) {
      const src = lazyScript.getAttribute('data-src') || '';
      const match = src.match(/client=(ca-pub-[a-zA-Z0-9_X]+)/);
      if (match && match[1]) {
        clientId = match[1];
      }
      lazyScript.remove(); // Remove the lazy tag since we are loading it dynamically
    }
    
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
    console.log('AdSense script loaded dynamically');
  }

  const adObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const adEl = entry.target.querySelector('ins.adsbygoogle');
        if (adEl && !adEl.getAttribute('data-adsbygoogle-loaded')) {
          if (adEl.offsetWidth > 0 && adEl.offsetHeight > 0) {
            // Lazy load the AdSense library itself right before pushing
            loadAdSenseScript();
            
            adEl.setAttribute('data-adsbygoogle-loaded', 'true');
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              console.log('Lazy loaded Ad slot:', adEl.getAttribute('data-ad-slot'));
              adObserver.unobserve(entry.target);
            } catch (err) {
              console.error('AdSense push error:', err);
            }
          }
        }
      }
    });
  }, {
    rootMargin: '200px' // Start loading ads 200px before entering viewport
  });

  // Watch all ad wrappers
  document.querySelectorAll('.ad-wrap').forEach(adWrapper => {
    adObserver.observe(adWrapper);
  });
});
