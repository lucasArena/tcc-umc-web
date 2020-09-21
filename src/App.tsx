import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';
import light from './styles/themes/light';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={light}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
