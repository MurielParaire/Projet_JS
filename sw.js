var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  "/Projet_JS/index.html",
  "/Projet_JS/app.js",
  "/Projet_JS/manifest.webmanifest",
  "/Projet_JS/assets/img/favicon.ico",
  "/Projet_JS/assets/img/pwa-icon.png",
  "/Projet_JS/assets/css/style.css",
  "/Projet_JS/assets/css/style_light.css",
  "/Projet_JS/assets/fonts/Inter-Bold.ttf",
  "/Projet_JS/assets/js/main.js",
  "/Projet_JS/assets/js/theme.js",
  "/Projet_JS/assets/js/install-pwa.js",
  "/Projet_JS/assets/js/section_switcher.js"
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    // Check de toutes les clés de cache.
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
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

        // IMPORTANT: Cloner la requête.
        // Une requete est un flux et est à consommation unique
        // Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
