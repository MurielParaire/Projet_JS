self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('PWA').then((cache) => cache.addAll([
            "/Project_JS/index.html",
            "/Project_JS/assets/img/favicon.ico",
            "/Project_JS/assets/img/pwa-icon.png",  
            "/Project_JS/assets/css/style.css",
            "/Project_JS/assets/css/style_light.css",
            "/Project_JS/assets/fonts/Inter-Bold.ttf",
            "/Project_JS/assets/js/main.js",
            "/Project_JS/assets/js/theme.js",
            "/Project_JS/assets/js/section_switcher.js"
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
