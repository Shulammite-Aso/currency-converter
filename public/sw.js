var URLsToCache = [
    '/',
    '/index.html',
    '/js/app.js',
    '/css/app.css',
    '/img/favicon.png',
    '/img/icons/app-icon-144x144.png',
    'https://fonts.googleapis.com/css?family=Roboto+Mono',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
];

self.addEventListener('install', function (event) {
    console.log('sw installed');
    event.waitUntil(

        caches.open('static')
            .then(function (cache) {
                console.log('Opened cache');
                cache.addAll(URLsToCache)
            })
    )


});


//show when service worker has been activated

self.addEventListener('activate', function () {
    console.log('sw activated');
});



self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          return fetch(event.request).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open('static')
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });

