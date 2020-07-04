import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Icons = {
  Home: ['home-outline', 'home'],
  Categories: ['apps', 'apps-box'],
  Downloads: ['cloud-download', 'cloud-download-outline'],
  Perfil: ['account', 'account-check'],
};

import Home from '../screens/Home';
import AppLoading from '../components/AppLoading';

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
        component={Home}
      />
      <Tab.Screen
        name="Categories"
        options={{ tabBarLabel: 'Categorias' }}
        component={AppLoading}
      />
      <Tab.Screen name="Downloads" component={AppLoading} />
      <Tab.Screen name="Perfil" component={AppLoading} />
    </Tab.Navigator>
  );
}
