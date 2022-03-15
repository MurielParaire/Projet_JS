self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('PWA').then((cache) => cache.addAll([
            "/Projet_JS/index.html",
            "/Projet_JS/assets/img/favicon.ico",
            "/Projet_JS/assets/img/pwa-icon.png",  
            "/Projet_JS/assets/css/style.css",
            "/Projet_JS/assets/css/style_light.css",
            "/Projet_JS/assets/fonts/Inter-Bold.ttf",
            "/Projet_JS/assets/js/main.js",
            "/Projet_JS/assets/js/theme.js",
            "/Projet_JS/assets/js/section_switcher.js"
        ])
    )
)
})

self.addEventListener('fetch', (e) => {
    console.log(e);
    e.respondWith(
  
      caches.match(e.request).then((response) => response || fetch(e.request)),
  
    );
});
