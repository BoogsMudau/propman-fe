import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MaintenanceLogsService } from './maintenance-logs.service';
import {
  loadMaintenanceLogsFailure,
  loadMaintenanceLogs,
  loadMaintenanceLogsSuccess,
  createMaintenanceLog,
  createMaintenanceLogSuccess,
  createMaintenanceLogFailure,
} from './maintenance-logs.action';
import { Router } from '@angular/router';

@Injectable()
export class MaintenanceLogsEffect {
  private actions$ = inject(Actions);
  private service = inject(MaintenanceLogsService);

  constructor(private router: Router) {}

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

  createMaintenanceLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMaintenanceLog),
      mergeMap(({ maintenanceLog }) =>
        this.service.createMaintenanceLog(maintenanceLog).pipe(
          map((maintenanceLog) => createMaintenanceLogSuccess({ maintenanceLog })),
          catchError((error) => of(createMaintenanceLogFailure({ error })))
        )
      )
    )
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createMaintenanceLogSuccess),
        tap(() => {
          this.router.navigate(['tabs', 'maintenance']);
        })
      ),
    { dispatch: false }
  );
}
