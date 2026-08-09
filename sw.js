// sw.js — Bill Tracker service worker
// Only job: receive a push message from the browser's push service and
// show it as a notification. Registered by bill-tracker.html on load;
// actual permission + subscription only happens when the user taps
// "Enable notifications" (never auto-prompted — see push section of
// bill-tracker.html for why).

self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) { data = { title: 'Bill Tracker', body: event.data ? event.data.text() : '' }; }
  const title = data.title || 'Bill Tracker';
  const options = {
    body: data.body || '',
    icon: data.icon || 'https://cdn.jsdelivr.net/npm/twemoji@14.0.2/assets/72x72/1f9fe.png', // receipt emoji, generic fallback
    badge: data.icon || undefined,
    data: { url: data.url || './bill-tracker.html' },
    tag: data.tag || 'bill-tracker-notice', // same tag replaces older un-clicked notifications instead of stacking
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Tapping the notification focuses an existing tab if one's open, else opens a new one.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || './bill-tracker.html';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('bill-tracker.html') && 'focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});
