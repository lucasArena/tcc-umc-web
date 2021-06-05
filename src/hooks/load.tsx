import React, { createContext, useCallback, useContext, useState } from 'react';

interface LoadContextData {
  isLoading: boolean;
  handleLoading(loadingStatus: boolean): void;
}

const AuthContext = createContext<LoadContextData>({} as LoadContextData);

const LoadProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoading = useCallback(
    (loadingStatus: boolean) => {
      setIsLoading(loadingStatus);
    },
    [setIsLoading],
  );

  return (
    <AuthContext.Provider value={{ isLoading, handleLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

function useLoad(): LoadContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useLoad must be within an LoadingProvider');
  }

  return context;
}

export { LoadProvider, useLoad };
