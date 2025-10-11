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

export const createMaintenanceLog = createAction(
  '[Maintenance] Create Maintenance Log',
  props<{ maintenanceLog: MaintenanceLog }>()
);

export const createMaintenanceLogSuccess = createAction(
  '[Maintenance] Create Maintenance Log Success',
  props<{ maintenanceLog: MaintenanceLog }>()
);

export const createMaintenanceLogFailure = createAction(
  '[Maintenance] Create Maintenance Log Failure',
  props<{ error: any }>()
);
