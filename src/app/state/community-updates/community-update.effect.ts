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
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CommunityUpdatesEffects {
  private actions$ = inject(Actions);
  private service = inject(CommunityUpdatesService);

  constructor(private router: Router) {}

  loadUpdates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCommunityUpdates),
      mergeMap(() =>
        this.service.getUpdates().pipe(
          map((updates) => loadCommunityUpdatesSuccess({ updates })),
          catchError((error) => of(loadCommunityUpdatesFailure({ error })))
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
