var cacheName = 'gdg-arapiraca12131231';

var filesToCache = [
    "index.html",
    "css/materialize.css",
    "css/style.css", 
    "js/init.js",
    "js/jquery-2.1.1.min.js",
    "js/materialize.js",
    "fonts/roboto/Roboto-Medium.woff2",
    "fonts/roboto/Roboto-Medium.woff2",
    "fonts/roboto/Roboto-Medium.woff",
    "fonts/roboto/Roboto-Medium.woff",
    "img/gdg.png"
]; 


self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(filesToCache);
            })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if ( key !== cacheName ) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(e) {
  console.log('[SW] Fetch', e.request.url);
  e.respondWith(
      caches.match(e.request).then(function (response) {
          return response

      })
  );

});