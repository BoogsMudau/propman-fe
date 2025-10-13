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
    this.enableNotifications();
  }

  async enableNotifications() {
    Notification.requestPermission().then((permission) => {
      console.log(permission);
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        this.user$.subscribe((user) => {
          if (user) {
            console.log(user);
            this.push.subscribeToNotifications(user.id);
          }
        });
      }
    });
  }
}
