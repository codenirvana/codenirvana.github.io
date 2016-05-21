importScripts('/js/cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('uditvasu').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/home.css'
      ]).then(function() {
        return self.skipWaiting();
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
