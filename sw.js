// ====================================================================
// SERVICE WORKER - Latela Order Management System
// Strategi: NETWORK-FIRST. Selalu coba ambil versi terbaru dari server
// dulu, cache cuma dipakai sebagai fallback kalau lagi offline/gagal
// konek. Ini sengaja dipilih (bukan cache-first) supaya update kode
// selalu langsung kepakai tanpa perlu trik cache-busting manual.
// ====================================================================

const CACHE_NAME = 'latela-oms-v1'; // 🔧 Naikkan angka versi ini kalau mau paksa bersihin cache lama

const APP_SHELL = [
  './',
  './index.html',
  './app.js',
  './style.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './logo-flower.png',
  './logo-loading.png'
];

// INSTALL: simpan app shell ke cache (buat fallback offline)
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch((err) => console.error('SW install gagal cache app shell:', err))
  );
});

// ACTIVATE: bersihin cache versi lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// FETCH: network-first untuk file di origin sendiri.
// Request ke luar (Google Apps Script, dsb) dibiarkan lewat jaringan
// langsung tanpa campur tangan service worker sama sekali.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((networkRes) => {
        const resClone = networkRes.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        return networkRes;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match('./index.html')))
  );
});
