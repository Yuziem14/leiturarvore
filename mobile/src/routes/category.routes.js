import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const CategoryStack = createStackNavigator();

import CategorySelection from '../screens/CategoriesStack/CategorySelection';
import Results from '../screens/CategoriesStack/Results';
import BookDetails from '../screens/BookDetails';

export default function CategoryRoutes() {
  return (
    <CategoryStack.Navigator headerMode={false}>
      <CategoryStack.Screen
        name="CategorySelection"
        component={CategorySelection}
      />
      <CategoryStack.Screen name="Results" component={Results} />
      <CategoryStack.Screen name="BookDetails" component={BookDetails} />
    </CategoryStack.Navigator>
  );
}
