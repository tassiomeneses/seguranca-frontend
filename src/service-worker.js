self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

self.addEventListener('fetch', function (event) {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response
        }

        const req = event.request.clone()
        return fetch(req).then(res => {
          if (!res || res.status !== 200) {
            return res
          }

          caches.open('API').then(cache => cache.put(event.request, res.clone()))
          return res
        })
      })
    )
  }
})
