import type { RootState } from './store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectFilter = (state: RootState) => state.filter.value;
