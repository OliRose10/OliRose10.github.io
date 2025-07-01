// sw.js - A basic service worker for caching assets

const CACHE_NAME = 'finance-for-musicians-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/services.html',
  '/portfolio.html',
  '/css/style.css',
  '/js/main.js',
  '/js/main.js?v=20250611',
  '/images/logo.png' // add other assets as needed...
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Remove old versions of caches.
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
