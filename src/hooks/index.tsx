import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { LoadProvider } from './load';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <LoadProvider>
      <ToastProvider>{children}</ToastProvider>
    </LoadProvider>
  </AuthProvider>
);

export default AppProvider;
