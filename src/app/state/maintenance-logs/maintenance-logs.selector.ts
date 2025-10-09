import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaintenanceLogsState } from './maintenance-logs.reducer';

export const selectMaintenanceUpdatesState =
  createFeatureSelector<MaintenanceLogsState>('maintenanceLogs');

export const selectMaintenanceLogs = createSelector(
  selectMaintenanceUpdatesState,
  (state) => state.maintenanceLogs
);

export const selectLoading = createSelector(
  selectMaintenanceUpdatesState,
  (state) => state.loading
);
