import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Categories from './category.routes';
import BookDetails from '../screens/BookDetails';
import Offline from '../screens/Offline';

function _createStack(name, component) {
  const Stack = createStackNavigator();
  return function () {
    return (
      <Stack.Navigator headerMode={false}>
        <Stack.Screen name={name} component={component} />
        <Stack.Screen name="BookDetails" component={BookDetails} />
      </Stack.Navigator>
    );
  };
}

export const HomeStack = _createStack('Home', Home);
export const OfflineStack = _createStack('Offline', Offline);
export const CategoriesStack = Categories;
