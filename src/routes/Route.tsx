import React, { useMemo } from 'react';
import {
  Redirect,
  Route as ReactDomRoute,
  RouteProps as ReactDomProps,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import AuthLayout from '../pages/_layouts/Auth';
import CompanyLayout from '../pages/_layouts/Company';
import AdminLayout from '../pages/_layouts/Admin';
import Default from '../pages/_layouts/Default';

interface RouteProps extends ReactDomProps {
  isPrivate?: boolean;
  isTopHeader?: boolean;
  isCompany?: boolean;
  isApplicant?: boolean;
  isAdmin?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isTopHeader = false,
  isCompany = false,
  isApplicant = false,
  isAdmin = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  const Layout = useMemo(() => {
    if ((isPrivate && !isCompany && !isAdmin && !isApplicant) || isTopHeader) {
      return AuthLayout;
    }

    if (isPrivate && isCompany) {
      return CompanyLayout;
    }

    if (isPrivate && isAdmin) {
      return AdminLayout;
    }

    return Default;
  }, [isPrivate, isTopHeader, isApplicant, isCompany, isAdmin]);

  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        if (isPrivate && !user) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          );
        }

        if (!isPrivate && user) {
          return (
            <Redirect
              to={{
                pathname: '/landing',
                state: { from: location },
              }}
            />
          );
        }

        if (user) {
          switch (user.profile_type) {
            case 'App\\ApplicantEloquent':
              if (isAdmin || isCompany) {
                return (
                  <Redirect
                    to={{
                      pathname: '/not-allow',
                      state: { from: location },
                    }}
                  />
                );
              }
              break;
            case 'App\\CompanyEloquent':
              if (isAdmin || isApplicant) {
                return (
                  <Redirect
                    to={{
                      pathname: '/not-allow',
                      state: { from: location },
                    }}
                  />
                );
              }
              break;
            case 'App\\AdminEloquent':
              if (isCompany || isApplicant) {
                return (
                  <Redirect
                    to={{
                      pathname: '/not-allow',
                      state: { from: location },
                    }}
                  />
                );
              }
              break;
            default:
          }
        }

        return (
          <Layout>
            <Component />
          </Layout>
        );
      }}
    />
  );
};

export default Route;
