/* assets/js/adsense.js */
/* Lazy loading loader for Google AdSense slots using IntersectionObserver */

document.addEventListener('DOMContentLoaded', () => {
  const adObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const adEl = entry.target.querySelector('ins.adsbygoogle');
        if (adEl && !adEl.getAttribute('data-adsbygoogle-loaded')) {
          adEl.setAttribute('data-adsbygoogle-loaded', 'true');
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            console.log('Lazy loaded Ad slot:', adEl.getAttribute('data-ad-slot'));
          } catch (err) {
            console.error('AdSense push error:', err);
          }
        }
        // Once ad is triggered, unobserve this wrapper container
        adObserver.unobserve(entry.target);
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
