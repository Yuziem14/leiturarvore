import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/auth';
import { OfflineProvider } from './src/contexts/offline';
import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar translucent style="light" />
      <NavigationContainer>
        <AuthProvider>
          <OfflineProvider>
            <Routes />
          </OfflineProvider>
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}
