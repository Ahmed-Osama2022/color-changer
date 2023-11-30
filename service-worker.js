importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js"
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst()
  // new workbox.strategies.NetworkFirst()
);

// const staticCacheName = 'site-static';
const staticCacheName = "site-cache-color-changer-v2";
const assets = ["/", "/index.html", "./app.js", "./style.css", "./logo.png"];

self.addEventListener("install", (evt) => {
  // console.log('service worker has been installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      // cache.addAll() >> It's async task!!
      cache.addAll(assets);
    })
  );
});

// Activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (evt) => {
  // console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
