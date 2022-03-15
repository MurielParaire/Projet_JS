if ('serviceWorker' in navigator) {
    
    navigator.serviceWorker.register('sw.js').then(
        (registration) => {
            console.log('Service Worker registration succeeded:', registration)
        },
        /*catch*/ (error) => {
            console.log('Service Worker registration failed:', error)
        }
    )
} 

else {
    console.log('Service workers are not supported.')
}

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

