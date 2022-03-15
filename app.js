if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(() => { console.log("Service Worker Registered"); });
}
    /*catch*/ (error) => {
      console.log('Service worker registration failed:', error)
    }
  )
} else {
  console.log('Service workers are not supported.')
}
