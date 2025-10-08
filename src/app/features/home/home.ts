import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectUpdates,
} from '../../state/community-updates/community-update.selector';
import { loadCommunityUpdates } from '../../state/community-updates/community-update.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private store = inject(Store);

  updates$ = this.store.select(selectUpdates);
  loading$ = this.store.select(selectLoading);

  ngOnInit() {
    this.store.dispatch(loadCommunityUpdates());
  }
}
