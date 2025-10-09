import { createAction, props } from '@ngrx/store';
import { MaintenanceLog } from './maintenance-logs.model';

export const loadMaintenanceLogs = createAction('[Maintenance] Load Maintenance');

export const loadMaintenanceLogsSuccess = createAction(
  '[Maintenance] Load Maintenance Success',
  props<{ maintenanceLogs: MaintenanceLog[] }>()
);

export const loadMaintenanceLogsFailure = createAction(
  '[Maintenance] Load Maintenance Failure',
  props<{ error: any }>()
);
