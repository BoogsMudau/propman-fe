import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { logOut } from '../../state/user/user.action';
import { selectUser } from '../../state/user/user.selector';
import { PushService } from '../../services/push.service';
import { User } from '../../state/user/user.model';
import { NotificationService } from '../../services/notify.service';

@Component({
  selector: 'app-info',
  imports: [CommonModule],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class Info implements OnInit {
  store = inject(Store);
  user$ = this.store.select(selectUser);
  currentUser: User | null = null;
  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private push: PushService,
    private notify: NotificationService
  ) {}
  async logOut() {
    const { error } = await this.supabase.getClient().auth.signOut();
    this.store.dispatch(logOut());
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  async enablePush() {
    if (!this.currentUser) {
      this.notify.notify('Please sign in to enable notifications.');
      return;
    }
    const storedPermission = localStorage.getItem('permissionState');
    // First check actual browser permission
    if (Notification.permission === 'granted' || storedPermission === 'granted') {
      this.subscribeUser();
      return;
    }

    Notification.requestPermission().then((permission) => {
      localStorage.setItem('permissionState', permission); // track user choice
      if (permission === 'granted') {
        window.location.reload();
      }
    });
  }

  private subscribeUser() {
    if (!this.currentUser) {
      return;
    }
    console.log(this.currentUser);
    this.push.subscribeToNotifications(this.currentUser.id);
  }
}
