import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { logOut } from '../../state/user/user.action';
import { selectUser } from '../../state/user/user.selector';
import { PushService } from '../../services/push.service';

@Component({
  selector: 'app-info',
  imports: [CommonModule],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class Info {
  store = inject(Store);
  user$ = this.store.select(selectUser);
  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private push: PushService
  ) {}
  async logOut() {
    const { error } = await this.supabase.getClient().auth.signOut();
    this.store.dispatch(logOut());
    this.router.navigate(['/login']);
  }

  async enablePush() {
    const storedPermission = localStorage.getItem('permissionState');
    // First check actual browser permission
    if (Notification.permission === 'granted' || storedPermission === 'granted') {
      console.log('Notification already permission granted.');
      this.subscribeUser();
      return;
    }

    Notification.requestPermission().then((permission) => {
      localStorage.setItem('permissionState', permission); // track user choice
      if (permission === 'granted') {
        this.subscribeUser();
      }
    });
  }

  private subscribeUser() {
    this.user$.subscribe((user) => {
      if (user) {
        console.log(user);
        this.push.subscribeToNotifications(user.id);
      }
    });
  }
}
