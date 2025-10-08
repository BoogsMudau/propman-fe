// community-updates.effects.ts
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCommunityUpdates,
  loadCommunityUpdatesSuccess,
  loadCommunityUpdatesFailure,
} from './community-update.action';
import { CommunityUpdatesService } from './community-update.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CommunityUpdatesEffects {
  private actions$ = inject(Actions);
  private service = inject(CommunityUpdatesService);

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
}
