import React from 'react';
import { useAuth } from '../contexts/auth';
import { useOffline } from '../contexts/offline';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import AppLoading from '../components/AppLoading';
import { SyncDataText } from '../globalStyles';

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
  const { loading: isDownloading } = useOffline();

  if ((signed && isDownloading) || loading) {
    return (
      <AppLoading>
        <SyncDataText>Sincronizando dados. Por favor, aguarde...</SyncDataText>
      </AppLoading>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
