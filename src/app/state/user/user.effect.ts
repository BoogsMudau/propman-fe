import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserService } from './user.service';
import { loadUser, loadUserFailure, loadUserSuccess } from './user.action';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private service = inject(UserService);

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      mergeMap(() =>
        this.service.getUser().pipe(
          map((user) => loadUserSuccess({ user })),
          catchError((error) => of(loadUserFailure({ error })))
        )
      )
    )
  );
}
