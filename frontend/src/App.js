import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';

import GlobalStyles from './styles/GlobalStyles';
import store from './store';
import Routes from './Routes';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

const theme = {};

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}
