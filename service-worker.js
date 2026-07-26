/* =============================================
   Weekly Workout – Service Worker v4
   
   HOW UPDATES WORK:
   1. New SW installs → skipWaiting() activates it immediately
   2. Old caches deleted
   3. clients.claim() + postMessage tells the open page to reload
   4. Network-first fetch: always fresh, cache = offline fallback only
   ============================================= */

const CACHE_NAME = 'weekly-workout-v4';
const BASE = '/Weekly';
const ASSETS = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/style.css',
  BASE + '/script.js',
  BASE + '/workout.json',
  BASE + '/manifest.json',
  BASE + '/icons/icon-192.png',
  BASE + '/icons/icon-512.png'
];

// INSTALL: cache assets, then skip waiting immediately
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // don't wait for old tabs to close
});

// ACTIVATE: wipe old caches, claim all open tabs,
// then tell every open tab to reload so they get fresh content
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
      )
      .then(() => self.clients.claim())
      .then(() => {
        // Notify all open tabs: "new version is ready, please reload"
        return self.clients.matchAll({ type: 'window' }).then(clients => {
          clients.forEach(client => client.postMessage({ type: 'SW_UPDATED' }));
        });
      })
  );
});

// FETCH: network-first
// Always try the network. Cache is only used when offline.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(cached => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match(BASE + '/index.html');
          }
        })
      )
  );
});
