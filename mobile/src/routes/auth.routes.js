import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import RegisterForm from '../screens/Register/Form';
import UserCategories from '../screens/Register/UserCategories';

const AuthStack = createStackNavigator();

export default function AuthRoutes() {
  return (
    <AuthStack.Navigator headerMode={false}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="RegisterForm" component={RegisterForm} />
      <AuthStack.Screen name="UserCategories" component={UserCategories} />
    </AuthStack.Navigator>
  );
}
