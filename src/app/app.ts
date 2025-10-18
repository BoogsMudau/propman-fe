import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUser } from './state/user/user.action';
import { Loader } from './components/loader/loader';
import { selectUser } from './state/user/user.selector';
import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('propman');
  private store = inject(Store);
  user$ = this.store.select(selectUser);

  constructor(private push: PushService) {}

  ngOnInit() {
    this.store.dispatch(loadUser());
    this.enablePush();
  }

  async enablePush() {
    const storedPermission = localStorage.getItem('permissionState');
    // First check actual browser permission
    if (Notification.permission === 'granted' || storedPermission === 'granted') {
      console.log('Notification already permission granted.');
      this.subscribeUser();
      return;
    }

    // Only request permission if not already granted
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      localStorage.setItem('permissionState', 'granted');
      this.subscribeUser();
    } else {
      localStorage.setItem('permissionState', permission);
    }
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
