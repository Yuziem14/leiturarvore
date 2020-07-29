import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Read from '../screens/Read';
import SharedInfo from '../screens/SharedInfo';
import TabRoutes from '../routes/app.tabs';

export default function AppRoutes() {
  return (
    <AppStack.Navigator headerMode={false} initialRouteName="App">
      <AppStack.Screen name="App" component={TabRoutes} />
      <AppStack.Screen name="Read" component={Read} />
      <AppStack.Screen name="SharedInfo" component={SharedInfo} />
    </AppStack.Navigator>
  );
}
