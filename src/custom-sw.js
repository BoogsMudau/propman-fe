self.addEventListener('push', (event) => {
  console.log('Push received:', event);

  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      icon: '/assets/icons/icon-72x72.png',
    })
  );
});
