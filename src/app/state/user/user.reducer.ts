import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.action';
import { User } from './user.model';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
