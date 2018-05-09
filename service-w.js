var cacheName = 'gdg-arapiraca102';

var filesToCache = [
    ".",
    "index.html",
    "css/materialize.css",
    "css/style.css",
    "js/jquery-2.1.1.min.js",
    "js/init.js",
    "js/materialize.js",
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
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      
        return response || fetch(event.request);
    
    })
  );
});