import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Icons = {
  Home: ['home-outline', 'home'],
  Categories: ['apps', 'apps-box'],
  Offline: ['cloud-download', 'cloud-download-outline'],
  Profile: ['account', 'account-check'],
  BookDetails: ['book', 'book-outline'],
};

import Profile from '../screens/Profile';
import { CategoriesStack, HomeStack, OfflineStack } from './app.stacks';

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const [iconOutline, iconFilled] = Icons[route.name];
          const iconName = !focused ? iconOutline : iconFilled;

          return (
            <MaterialCommunityIcons name={iconName} color={color} size={size} />
          );
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: '#220066',
        activeTintColor: '#157EFB',
        inactiveBackgroundColor: '#220066',
        inactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Home"
        options={{ tabBarLabel: 'Início' }}
        component={HomeStack}
      />
      <Tab.Screen
        name="Categories"
        options={{ tabBarLabel: 'Categorias' }}
        component={CategoriesStack}
      />
      <Tab.Screen name="Offline" component={OfflineStack} />
      <Tab.Screen
        name="Profile"
        options={{ tabBarLabel: 'Perfil' }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
