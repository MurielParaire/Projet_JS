if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('Projet_JS/sw.js')
    .then(() => { console.log("Service Worker Registered"); });
}
