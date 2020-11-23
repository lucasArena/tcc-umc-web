import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global';
import light from './styles/themes/light';

import Routes from './routes';

import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={light}>
      <AppProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <GlobalStyles />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
