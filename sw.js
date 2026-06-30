// =========================================================================
// LATELA OMS — Service Worker
// Strategi: cache file statis (shell app) untuk install & load cepat,
// tapi SELALU fetch langsung ke network untuk Google Apps Script & Weather API
// (supaya data penjualan/SKU/cuaca tetap real-time, tidak basi karena cache)
// =========================================================================

const CACHE_NAME = 'latela-oms-v2';
const STATIC_ASSETS = [
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Domain yang TIDAK boleh di-cache (selalu network fresh)
const NEVER_CACHE_HOSTS = [
  'script.google.com',
  'api.open-meteo.com',
  'docs.google.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Jangan cache sama sekali request ke API eksternal (data live)
  if (NEVER_CACHE_HOSTS.some((host) => url.hostname.includes(host))) {
    event.respondWith(fetch(event.request));
    return;
  }

  // CDN library (xlsx, chart.js, jspdf) — cache-first dengan fallback network
  if (url.hostname.includes('cdn.jsdelivr.net')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // File statis app sendiri — network-first supaya update selalu kepakai,
  // fallback ke cache kalau offline / network gagal
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
