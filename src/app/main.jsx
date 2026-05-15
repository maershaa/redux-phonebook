import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from '../assets/styles/global';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { theme } from '../assets/styles/theme';
import store from '@/redux/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
