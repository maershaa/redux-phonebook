import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import authReducer from './authSlice';
import filterReducer from './filterSlice';

export default configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
    auth: authReducer,
  },
});
