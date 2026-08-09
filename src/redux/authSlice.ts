import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthSliceType = {
  isLoggedIn: boolean;
  user: {
    login: string;
    password: string;
  } | null;
};

const initialState: AuthSliceType = { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{
        login: string;
        password: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      console.log(action);
    },
    logOut: state => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
