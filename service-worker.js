/* =============================================
   Weekly Workout – Service Worker v3
   Network-FIRST strategy: always fetches fresh
   from server, falls back to cache when offline.
   Bumping CACHE_NAME forces old SW to be replaced.
   ============================================= */

const CACHE_NAME = 'weekly-workout-v3';
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

// Install: pre-cache all assets then activate immediately
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  // Skip waiting so the new SW activates right away
  // without needing the user to close all tabs
  self.skipWaiting();
});

// Activate: delete ALL old caches, then claim all clients immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: NETWORK-FIRST
// Try the network. If it responds, update the cache and return fresh content.
// If the network fails (offline), fall back to cache.
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Got a fresh response — update cache then return it
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Network failed — serve from cache (offline support)
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match(BASE + '/index.html');
          }
        });
      })
  );
});
