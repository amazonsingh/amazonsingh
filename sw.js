const CACHE_NAME = 'iframe-cache-v1';
const urlsToCache = [
  // Add URLs you want to cache initially if any
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate') {
    // Check if the request is an iframe request and handle it
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }

          // Important: Clone the request. A request is a stream and can only be consumed once.
          // Since we are consuming this once by cache and once by browser, we need to clone it.
          const fetchRequest = event.request.clone();

          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Important: Clone the response. A response is a stream and because we want the browser
              // to consume the response as well as the cache consuming the response, we need to clone it
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          );
        })
    );
  } else {
    // For other types of requests, we can handle them as per normal
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          return response || fetch(event.request);
        })
    );
  }
});

self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
