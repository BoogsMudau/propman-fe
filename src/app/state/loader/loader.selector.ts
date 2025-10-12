import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LoadingState } from './loader.reducer';

export const selectLoadingState = createFeatureSelector<LoadingState>('loader');
export const selectIsLoading = createSelector(selectLoadingState, (s) => s.isLoading);
