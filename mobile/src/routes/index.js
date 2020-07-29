import React from 'react';
import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import AppLoading from '../components/AppLoading';

export const linking = {
  prefixes: ['http://leiturarvore.com', 'leiturarvore://'],
  config: {
    screens: {
      Read: {
        path: 'read/:url',
        parse: {
          url: url => decodeURIComponent(url),
        },
      },
    },
  },
};

export function Routes() {
  const { signed, loading } = useAuth();

  if (loading) {
    return <AppLoading />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
