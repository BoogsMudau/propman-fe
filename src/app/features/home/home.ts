import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectUpdates,
} from '../../state/community-updates/community-update.selector';
import { loadCommunityUpdates } from '../../state/community-updates/community-update.action';
import { CommonModule } from '@angular/common';
import { UpdateCard } from '../../components/update-card/update-card';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { selectUser } from '../../state/user/user.selector';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [CommonModule, UpdateCard, IonicModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private store = inject(Store);
  private alertCtrl = inject(AlertController);

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  updates$ = this.store.select(selectUpdates);
  loading$ = this.store.select(selectLoading);
  user$ = this.store.select(selectUser);

  ngOnInit() {
    this.store.dispatch(loadCommunityUpdates());
  }

  async goToCreate() {
    this.user$.subscribe(async (user) => {
      if (!user) {
      }
    });
    this.router.navigate(['tabs', 'create']);
  }
}
