import { createReducer, on } from '@ngrx/store';
import * as MaintenanceActions from './maintenance-logs.action';
import { MaintenanceLog } from './maintenance-logs.model';

export interface MaintenanceLogsState {
  maintenanceLogs: MaintenanceLog[];
  loading: boolean;
  error: any;
}

export const initialState: MaintenanceLogsState = {
  maintenanceLogs: [],
  loading: false,
  error: null,
};

export const maintenanceLogsReducer = createReducer(
  initialState,
  on(MaintenanceActions.loadMaintenanceLogs, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MaintenanceActions.loadMaintenanceLogsSuccess, (state, { maintenanceLogs }) => ({
    ...state,
    loading: false,
    maintenanceLogs,
  })),
  on(MaintenanceActions.loadMaintenanceLogsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
