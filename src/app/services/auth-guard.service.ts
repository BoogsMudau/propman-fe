import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take, map } from 'rxjs/operators';
import { selectUserState } from '../state/user/user.selector';
import { NotificationService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private notify: NotificationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(selectUserState).pipe(
      filter((state) => !state?.loading),
      take(1),
      map((userState) => {
        if (userState.user) {
          return true;
        } else {
          const url = state.url || route.routeConfig?.path || '';

          if (url.includes('create')) {
            this.notify.notify('Please sign in to create a post.');
          } else if (url.includes('maintenance')) {
            this.notify.notify('Please sign in to log maintenance.');
          }

          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
