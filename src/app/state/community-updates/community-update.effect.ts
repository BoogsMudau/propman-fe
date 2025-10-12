import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCommunityUpdates,
  loadCommunityUpdatesSuccess,
  loadCommunityUpdatesFailure,
  createCommunityUpdate,
  createCommunityUpdateSuccess,
  createCommunityUpdateFailure,
} from './community-update.action';
import { CommunityUpdatesService } from './community-update.service';
import { catchError, finalize, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { hideLoader, showLoader } from '../loader/loader.action';

@Injectable()
export class CommunityUpdatesEffects {
  private actions$ = inject(Actions);
  private service = inject(CommunityUpdatesService);
  private store = inject(Store);

  constructor(private router: Router) {}

  loadUpdates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCommunityUpdates),
      tap(() => this.store.dispatch(showLoader())),
      mergeMap(() =>
        this.service.getUpdates().pipe(
          map((updates) => loadCommunityUpdatesSuccess({ updates })),
          catchError((error) => of(loadCommunityUpdatesFailure({ error }))),
          finalize(() => this.store.dispatch(hideLoader()))
        )
      )
    )
  );

  createUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCommunityUpdate),
      mergeMap(({ update }) =>
        this.service.createUpdate(update).pipe(
          map((update) => createCommunityUpdateSuccess({ update })),
          catchError((error) => of(createCommunityUpdateFailure({ error })))
        )
      )
    )
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createCommunityUpdateSuccess),
        tap(() => this.router.navigate(['tabs', 'home']))
      ),
    { dispatch: false }
  );
}
