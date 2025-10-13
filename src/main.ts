import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { addIcons } from 'ionicons';
import {
  home,
  notifications,
  person,
  build,
  add,
  chatbubbleOutline,
  sendOutline,
} from 'ionicons/icons';

addIcons({
  home,
  notifications,
  person,
  build,
  add,
  chatbubbleOutline,
  sendOutline,
});

console.log('main');
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('ngsw-custom.js')
    .then((reg) => console.log('Custom+Angular SW registered:', reg))
    .catch((err) => console.error('SW registration failed:', err));
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
