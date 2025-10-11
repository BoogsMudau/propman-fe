// community-updates.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as CommunityActions from './community-update.action';
import { CommunityUpdate } from './community-update.model';

export interface CommunityUpdatesState {
  updates: CommunityUpdate[];
  loading: boolean;
  error: any;
}

export const initialState: CommunityUpdatesState = {
  updates: [],
  loading: false,
  error: null,
};

export const communityUpdatesReducer = createReducer(
  initialState,
  on(CommunityActions.loadCommunityUpdates, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CommunityActions.loadCommunityUpdatesSuccess, (state, { updates }) => ({
    ...state,
    loading: false,
    updates,
  })),
  on(CommunityActions.loadCommunityUpdatesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CommunityActions.createCommunityUpdate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CommunityActions.createCommunityUpdateSuccess, (state, { update }) => ({
    ...state,
    loading: false,
    updates: [...state.updates, update],
  })),
  on(CommunityActions.createCommunityUpdateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
