const cacheName = 'v1';

// Call install event
this.addEventListener('install', (e)=> {
    console.log('Server worker installed');

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
        fetch(e.request)
            .then( res => {
                // Make clone of response
                const resClone = res.clone();
                caches.open(cacheName)
                    .then(cache=> {
                        // Add copy response in cache
                        cache.put(e.request, resClone);
                    });
                return res;
            })
            .catch( err => caches.match(e.request).then(res=> res))
        // fetch(e.request).catch(()=> caches.match(e.request))
    )
})