import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false, user: null },
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logOut: state => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
