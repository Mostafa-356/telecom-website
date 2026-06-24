// Minimal service worker for Next.js PWA support
// This prevents 404 errors when browser requests sw.js

self.addEventListener('install', (event) => {
  console.log('Service Worker installed')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated')
  event.waitUntil(clients.claim())
})

self.addEventListener('fetch', (event) => {
  // Let Next.js handle all requests
  // Service worker is optional for this app
})
