import { createAction, props } from '@ngrx/store';
import { CommunityUpdate } from './community-update.model';

export const loadCommunityUpdates = createAction('[Community] Load Updates');

export const loadCommunityUpdatesSuccess = createAction(
  '[Community] Load Updates Success',
  props<{ updates: CommunityUpdate[] }>()
);

export const loadCommunityUpdatesFailure = createAction(
  '[Community] Load Updates Failure',
  props<{ error: any }>()
);
