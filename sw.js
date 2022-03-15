self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('my-custom-pwa').then((cache) => cache.addAll([
            "/index.html",
            "/manifest.webmanifest",
            "/assets/img/favicon.ico",
            "/assets/img/pwa-icon.png",  
            "/assets/css/style.css",
            "/assets/css/style_light.css",
            "/assets/fonts/Inter-Bold.ttf",
            "/assets/js/main.js",
            "/assets/js/theme.js",
            "/assets/js/section_switcher.js"
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
                   
