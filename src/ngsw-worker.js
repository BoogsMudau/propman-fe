importScripts('ngsw-worker.js');

self.addEventListener('push', (event) => {
  console.log('[Custom Push Handler] Push received worker.js:', event);

  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (err) {
    console.error('Error parsing push data:', err);
  }

  const title = data.title || data.notification?.title || 'Default title';
  const body = data.message || data.notification?.body || 'Default body';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/assets/icons/icon-72x72.png',
    })
  );
});
