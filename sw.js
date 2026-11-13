// Everquinn offline support.
// The app opens instantly from this device's copy and quietly refreshes it in the background,
// so a new version of index.html appears the second time you open the app.
// Only change CACHE if you add or rename files in FILES below.
const CACHE = 'everquinn-v1';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return; // never touch outside requests (covers, weather)
  const isPage = req.mode === 'navigate';
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(isPage ? 'index.html' : req, { ignoreSearch: true });
    const refresh = fetch(req).then(res => {
      if (res && res.ok) cache.put(isPage ? 'index.html' : req, res.clone());
      return res;
    }).catch(() => null);
    if (hit) { e.waitUntil(refresh); return hit; }
    return (await refresh) || (isPage ? cache.match('index.html') : Response.error());
  })());
});
