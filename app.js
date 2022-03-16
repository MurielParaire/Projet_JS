if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/Projet_JS/sw.js', { scope: '/Projet_JS/' })
    .then(() => { console.log("Service Worker Registered"); });
}
