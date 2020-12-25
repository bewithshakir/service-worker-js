const cacheName = 'v2';
const cacheAssets = [
    'index.html',
    'about.html',
    'css/style.css',
    'js/main.js'
]
// Call install event
this.addEventListener('install', (e)=> {
    console.log('Server worker installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache=> {
                cache.addAll(cacheAssets)
            })
            .then(()=> this.skipWaiting())
    )
})

// Activate event
this.addEventListener('activate', (e)=> {
    console.log('Server worker activated');
    e.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.map( cache => {
                    if (cache !== cacheName) {
                        console.log('Clearing old cache')
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

// Fech from cache
this.addEventListener('fetch', (e)=> {
    console.log('Fetch from cache');
    e.respondWith(
        fetch(e.request).catch(()=> caches.match(e.request))
    )
})