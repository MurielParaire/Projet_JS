var cacheName = 'Projet_JS';
var appShellFiles = [
  '/Projet_JS/index.html',
  '/Projet_JS/assets/img/favicon.ico',  
  '/Projet_JS/assets/css/style.css',
  '/Projet_JS/assets/css/style_light.css',
  '/Projet_JS/assets/fonts/Inter-Bold.ttf',
  '/Projet_JS/assets/js/app.js',
  '/Projet_JS/assets/js/main.js',
  '/Projet_JS/assets/js/theme.js',
  '/Projet_JS/assets/js/section_switcher.js'
];

contentToCache = appShellFiles.concat();

self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  console.log(`[Service Worker] Fetched resource ${e.request.url}`);
});


self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
