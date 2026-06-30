/* sw.js */
/* Temporary cache-clearing Service Worker to force update during development */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(names.map(name => caches.delete(name)));
    })
  );
  self.clients.claim();
});
