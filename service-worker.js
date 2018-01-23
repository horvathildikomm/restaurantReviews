var CACHE_NAME = 'static-cache';
var urlsToCache = [
  '/data/restaurants.json',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css'
];

// self.addEventListener('fetch', catchFetch);

function catchFetch(event) {
// console.log({url: event.request.url, match: event.request.url.match('localhost')})
if(event.request.url.match('localhost'))
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      console.log({req:event.request, response})
      return response || fetchAndCache(event.request);
    })
  );
}

function fetchAndCache(request) {
  return fetch(request)
  .then(function(response) {
    // Check if we received a valid response
    // if (!response.ok) {
    //   console.log({response})
    //   throw Error(response.statusText);
    // }
    return response;
    // return caches.open(CACHE_NAME)
    // .then(function(cache) {
    //   cache.put(url, response.clone());
    //   return response;
    // });
  })
  // .catch(function(error) {
  //   console.log('Request failed:', error);
  //   // You could return a custom offline 404 page here
  // });
}
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
