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
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
