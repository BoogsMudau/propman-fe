import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs/operators';
import { selectUser, selectUserState } from '../state/user/user.selector';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate() {
    return this.store.select(selectUserState).pipe(
      filter((state) => !state?.loading),
      take(1),
      map((state) => {
        if (state.user && state.user.role !== 'admin') {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
