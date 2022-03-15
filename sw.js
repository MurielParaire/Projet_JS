self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('PWA').then((cache) => cache.addAll([
            "/Project/_JS/index.html",
            "/Project/_JS/assets/img/favicon.ico",
            "/Project/_JS/assets/img/pwa-icon.png",  
            "/Project/_JS/assets/css/style.css",
            "/Project/_JS/assets/css/style_light.css",
            "/Project/_JS/assets/fonts/Inter-Bold.ttf",
            "/Project/_JS/assets/js/main.js",
            "/Project/_JS/assets/js/theme.js",
            "/Project/_JS/assets/js/section_switcher.js"
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
