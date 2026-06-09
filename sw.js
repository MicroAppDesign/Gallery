const CACHE_NAME = 'gitgallery-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/tailwind.js',
  '/assets/fontawesome.css',
  '/assets/fonts.css',
  '/assets/placeholder.svg',
  '/assets/webfonts/fa-solid-900.woff2',
  '/assets/webfonts/fa-brands-400.woff2',
  '/assets/webfonts/fa-regular-400.woff2',
  '/assets/fonts/plus-jakarta-sans-400.ttf',
  '/assets/fonts/plus-jakarta-sans-700.ttf',
  '/assets/fonts/sarabun-400.ttf',
  '/assets/fonts/sarabun-700.ttf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return response;
      }).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
        if (event.request.destination === 'image') {
          return caches.match('/assets/placeholder.svg');
        }
      });
    })
  );
});
