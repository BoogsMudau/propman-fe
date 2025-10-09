import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectUpdates,
} from '../../state/community-updates/community-update.selector';
import { loadCommunityUpdates } from '../../state/community-updates/community-update.action';
import { CommonModule } from '@angular/common';
import { UpdateCard } from '../../components/update-card/update-card';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, UpdateCard, IonicModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private store = inject(Store);

  constructor(private router: Router) {}

  updates$ = this.store.select(selectUpdates);
  loading$ = this.store.select(selectLoading);

  ngOnInit() {
    this.store.dispatch(loadCommunityUpdates());
  }

  goToCreate() {
    this.router.navigate(['tabs', 'create']);
  }
}
