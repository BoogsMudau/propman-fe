import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of } from 'rxjs';
import { MaintenanceLogsService } from './maintenance-logs.service';
import {
  loadMaintenanceLogsFailure,
  loadMaintenanceLogs,
  loadMaintenanceLogsSuccess,
} from './maintenance-logs.action';

@Injectable()
export class MaintenanceLogsEffect {
  private actions$ = inject(Actions);
  private service = inject(MaintenanceLogsService);

  loadMaintenanceLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMaintenanceLogs),
      mergeMap(() =>
        this.service.getMaintenanceLogs().pipe(
          map((maintenanceLogs) => loadMaintenanceLogsSuccess({ maintenanceLogs })),
          catchError((error) => of(loadMaintenanceLogsFailure({ error })))
        )
      )
    )
  );
}
