import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { communityUpdatesReducer } from './state/community-updates/community-update.reducer';
import { CommunityUpdatesEffects } from './state/community-updates/community-update.effect';
import { IonicModule } from '@ionic/angular';
import { MaintenanceLogsEffect } from './state/maintenance-logs/maintenance-logs.effect';
import { maintenanceLogsReducer } from './state/maintenance-logs/maintenance-logs.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore({
      communityUpdates: communityUpdatesReducer,
      maintenanceLogs: maintenanceLogsReducer,
    }),
    provideEffects([CommunityUpdatesEffects, MaintenanceLogsEffect]),
    provideStoreDevtools({ maxAge: 25 }),
    importProvidersFrom([IonicModule.forRoot()]),
  ],
};
