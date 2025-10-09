import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommunityUpdatesState } from './community-update.reducer';

export const selectCommunityUpdatesState =
  createFeatureSelector<CommunityUpdatesState>('communityUpdates');

export const selectUpdates = createSelector(selectCommunityUpdatesState, (state) => state.updates);

export const selectLoading = createSelector(selectCommunityUpdatesState, (state) => state.loading);
