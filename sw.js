// Service Worker for Romane du jour PWA
const CACHE_NAME = 'romane-du-jour-v1';
const urlsToCache = [
  '/',
  '/index-local.html',
  '/index-modular.html',
  '/styles.css',
  '/config.js',
  '/utils.js',
  '/app.js',
  '/app-bundle.js',
  '/theme.js',
  '/export.js',
  '/entries.js',
  '/calendar.js',
  '/garden.js',
  '/ui.js',
  '/app-new.js',
  'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service Worker: Cache installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(error => {
        console.error('Service Worker: Fetch failed:', error);
        return fetch(event.request);
      })
  );
});

// Skip waiting for new service worker
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});