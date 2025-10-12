import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading } from '../../state/loader/loader.selector';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  store = inject(Store);
  isLoading$ = this.store.select(selectIsLoading);
}
