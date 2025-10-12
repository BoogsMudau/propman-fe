import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, finalize, map, mergeMap, of, tap } from 'rxjs';
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
import { Store } from '@ngrx/store';
import { hideLoader, showLoader } from '../loader/loader.action';

@Injectable()
export class MaintenanceLogsEffect {
  private actions$ = inject(Actions);
  private service = inject(MaintenanceLogsService);
  private store = inject(Store);

  constructor(private router: Router) {}

  loadMaintenanceLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMaintenanceLogs),
      tap(() => this.store.dispatch(showLoader())),
      mergeMap(({ id }) =>
        this.service.getMaintenanceLogs(id).pipe(
          map((maintenanceLogs) => loadMaintenanceLogsSuccess({ maintenanceLogs })),
          catchError((error) => of(loadMaintenanceLogsFailure({ error }))),
          finalize(() => this.store.dispatch(hideLoader()))
        )
      )
    )
  );

  createMaintenanceLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMaintenanceLog),
      tap(() => this.store.dispatch(showLoader())),
      mergeMap(({ maintenanceLog }) =>
        this.service.createMaintenanceLog(maintenanceLog).pipe(
          map((maintenanceLog) => createMaintenanceLogSuccess({ maintenanceLog })),
          catchError((error) => of(createMaintenanceLogFailure({ error }))),
          finalize(() => this.store.dispatch(hideLoader()))
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
