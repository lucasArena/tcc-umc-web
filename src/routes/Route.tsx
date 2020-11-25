import React, { useMemo } from 'react';
import {
  Redirect,
  Route as ReactDomRoute,
  RouteProps as ReactDomProps,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import AuthLayout from '../pages/_layouts/Auth';
import CompanyLayout from '../pages/_layouts/Company';
import Default from '../pages/_layouts/Default';

interface RouteProps extends ReactDomProps {
  isPrivate?: boolean;
  isCompany?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isCompany = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  const Layout = useMemo(() => {
    if (isPrivate && !isCompany) {
      return AuthLayout;
    }

    if (isPrivate && isCompany) {
      return CompanyLayout;
    }

    return Default;
  }, [isCompany, isPrivate]);

  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Layout>
            <Component />
          </Layout>
        ) : (
            <Redirect
              to={{
                pathname: !user ? '/' : '/landing',
                state: { from: location },
              }}
            />
          );
      }}
    />
  );
};

export default Route;
