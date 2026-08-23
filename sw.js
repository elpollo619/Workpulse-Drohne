// Service worker de Workpulse: la app funciona sin conexión en campo.
// HTML: red primero (nunca servir una versión vieja tras un despliegue).
// Assets con hash: caché primero (inmutables).
const RUNTIME = 'workpulse-v1'

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  if (e.request.method !== 'GET' || url.origin !== location.origin) return

  if (e.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(e.request)
        .then((r) => {
          const copy = r.clone()
          caches.open(RUNTIME).then((c) => c.put(e.request, copy))
          return r
        })
        .catch(() => caches.match(e.request))
    )
  } else {
    e.respondWith(
      caches.match(e.request).then(
        (hit) =>
          hit ||
          fetch(e.request).then((r) => {
            const copy = r.clone()
            caches.open(RUNTIME).then((c) => c.put(e.request, copy))
            return r
          })
      )
    )
  }
})
