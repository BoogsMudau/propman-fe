import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { communityUpdatesReducer } from './state/community-updates/community-update.reducer';
import { CommunityUpdatesEffects } from './state/community-updates/community-update.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore({ communityUpdates: communityUpdatesReducer }),
    provideEffects([CommunityUpdatesEffects]),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
