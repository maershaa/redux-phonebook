import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from '@/redux/services/contactsApi';
import authReducer from './authSlice';
import filterReducer from './filterSlice';

// import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer, // reducerPath — уникальный ключ под которым RTK Query
    // будет хранить cache, loading, error и данные запросов
    filter: filterReducer,
    auth: authReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

//setupListeners(store.dispatch); //!

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
