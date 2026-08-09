import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';

import { theme } from '@/assets/styles/theme.js';
import GlobalStyles from '@/assets/styles/global.jsx';

import App from './App.jsx';
import { store } from '@/redux/store';

const root = document.getElementById('root') as HTMLInputElement;

createRoot(root).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Provider store={store}>
        <BrowserRouter basename="/redux-phonebook/">
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
