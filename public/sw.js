// MSMM Engineering Service Worker
const CACHE_VERSION = "msmmeng-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGES_CACHE = `${CACHE_VERSION}-pages`;
const IMAGES_CACHE = `${CACHE_VERSION}-images`;

// Static assets to pre-cache on install
const PRECACHE_ASSETS = [
  "/offline.html",
  "/favicon.svg",
  "/favicon-32.png",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/manifest.json",
];

// Pages to cache for offline viewing
const PRECACHE_PAGES = [
  "/",
  "/about",
  "/services",
  "/contact",
];

// Install: pre-cache essential assets and pages
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS)),
      caches.open(PAGES_CACHE).then((cache) =>
        // Use individual fetch+put so a single page failure doesn't break install
        Promise.allSettled(
          PRECACHE_PAGES.map((url) =>
            fetch(url)
              .then((response) => {
                if (response.ok) {
                  return cache.put(url, response);
                }
              })
              .catch(() => {
                // Page not available during install; that's okay
              })
          )
        )
      ),
    ]).then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name.startsWith("msmmeng-") && name !== STATIC_CACHE && name !== PAGES_CACHE && name !== IMAGES_CACHE)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Helper: is this a navigation request?
function isNavigationRequest(request) {
  return request.mode === "navigate" || (request.method === "GET" && request.headers.get("accept")?.includes("text/html"));
}

// Helper: is this a static asset?
function isStaticAsset(url) {
  return /\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|webp|avif|ico|gif)(\?.*)?$/i.test(url.pathname) ||
    url.pathname.startsWith("/_next/static/");
}

// Helper: is this an image?
function isImage(url) {
  return /\.(png|jpg|jpeg|webp|avif|gif|svg|ico)(\?.*)?$/i.test(url.pathname);
}

// Fetch handler
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests from same origin (or CDN images)
  if (request.method !== "GET") return;

  // Skip Sanity Studio and API routes
  if (url.pathname.startsWith("/studio") || url.pathname.startsWith("/api/")) return;

  // Navigation requests: network-first with offline fallback
  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful page responses
          if (response.ok) {
            const clone = response.clone();
            caches.open(PAGES_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match("/offline.html"))
        )
    );
    return;
  }

  // Static assets: cache-first
  if (isStaticAsset(url)) {
    const cacheName = isImage(url) ? IMAGES_CACHE : STATIC_CACHE;
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(cacheName).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch(() => {
          // For images, return nothing rather than an error
          if (isImage(url)) {
            return new Response("", { status: 408, statusText: "Offline" });
          }
          return new Response("Offline", { status: 408 });
        });
      })
    );
    return;
  }

  // Everything else: network-first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
