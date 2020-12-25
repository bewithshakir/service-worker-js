// check service worker
// navigator.serviceWorker || 'serviceWorker' in navigator
if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=> {
        navigator.serviceWorker.register('../sw_cached_site.js')
        .then((reg)=> {
            console.log('Service worker registered')
        })
        .catch((error)=> {
            console.log('register error---', error)
        })
    })
}