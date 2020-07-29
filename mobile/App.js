import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import AppLoading from './src/components/AppLoading';
import { AuthProvider } from './src/contexts/auth';
import { OfflineProvider } from './src/contexts/offline';
import { linking, Routes } from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar translucent style="light" />
      <NavigationContainer linking={linking} fallback={<AppLoading />}>
        <AuthProvider>
          <OfflineProvider>
            <Routes />
          </OfflineProvider>
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}
