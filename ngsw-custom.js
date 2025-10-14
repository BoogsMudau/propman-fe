self.addEventListener('push', (event) => {
  console.log('[Custom Push Handler] Push received custom:', event);

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
      icon: 'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png',
      badge: 'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png', // adds small badge
      tag: 'demo-notification', // unique tag avoids duplicates
      renotify: true,
    })
  );
});
