import { createReducer, on } from '@ngrx/store';
import { showLoader, hideLoader } from './loader.action';

export interface LoadingState {
  isLoading: boolean;
}

export const initialState: LoadingState = { isLoading: false };

export const loadingReducer = createReducer(
  initialState,
  on(showLoader, (state) => ({ ...state, isLoading: true })),
  on(hideLoader, (state) => ({ ...state, isLoading: false }))
);
