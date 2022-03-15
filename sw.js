self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

const cacheName = 'Projet_JS-v1';
const appShellFiles = [
    "./index.html"
    "./manifest.webmanifest",
    "./assets/img/favicon.ico",
    "./assets/img/pwa-icon.png",  
    "./assets/css/style.css",
    "./assets/css/style_light.css",
    "./assets/fonts/Inter-Bold.ttf",
    "./assets/js/main.js",
    "./assets/js/theme.js",
    "./assets/js/section_switcher.js"
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(appShellFiles);
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});



