import React from 'react';
import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import AppLoading from '../components/AppLoading';

export default function Routes() {
  const { signed, loading } = useAuth();

  if (loading) {
    return <AppLoading />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
