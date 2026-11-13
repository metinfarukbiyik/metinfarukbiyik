/*
 * draw.biyik.dev çevrimdışı çalışma (service worker).
 * - Sayfa: önce ağ, olmazsa önbellek (güncel sürüm öncelikli, internetsizken son kopya)
 * - /_next/static, yazı tipleri, görseller: önce önbellek (dosya adları içerik özetli)
 * Paylaşım bağlantılarındaki çizim # kısmında olduğu için önbellekteki sayfa her bağlantıyı açabilir.
 */
const CACHE = 'draw-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key);
      await self.clients.claim();
    })(),
  );
});

// Sayfa, kendisini yükleyen dosyaların listesini gönderir; hepsi önbelleğe alınır.
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'cache' || !Array.isArray(event.data.urls)) return;
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.all(event.data.urls.map((url) => cache.add(url).catch(() => undefined))),
    ),
  );
});

const isStatic = (path) =>
  path.startsWith('/_next/static/') || path.startsWith('/draw-docs/') || /\.(woff2?|ttf|png|svg|ico|webp)$/.test(path);

function store(request, response) {
  if (response.ok) {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(request, copy));
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    const key = url.pathname;
    event.respondWith(
      fetch(request)
        .then((res) => store(key, res))
        .catch(async () => (await caches.match(key)) || (await caches.match('/')) || Response.error()),
    );
    return;
  }

  if (isStatic(url.pathname)) {
    event.respondWith(caches.match(request).then((hit) => hit || fetch(request).then((res) => store(request, res))));
    return;
  }

  event.respondWith(fetch(request).catch(() => caches.match(request).then((hit) => hit || Response.error())));
});
