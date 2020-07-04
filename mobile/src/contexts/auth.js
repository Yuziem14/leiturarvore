import React, { useState, useEffect, useContext, createContext } from 'react';
import { AsyncStorage } from 'react-native';
import * as authService from '../services/auth';

const TOKEN_KEY = '@leiturarvore:token';
const REFRESH_TOKEN_KEY = '@leiturarvore:refreshToken';
const USER = '@leiturarvore:user';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function _loadStorage() {
      const [token, user] = await AsyncStorage.multiGet([TOKEN_KEY, USER]);
      authService.setAuthHeader(token[1]);
      setUser(JSON.parse(user[1]));
      setLoading(false);
    }

    _loadStorage();
  }, []);

  async function signIn(email, password) {
    const data = await authService.login(email, password);
    console.log(data);
    await AsyncStorage.multiSet([
      [TOKEN_KEY, data.token],
      [REFRESH_TOKEN_KEY, data.refreshToken],
      [USER, JSON.stringify(data.user)],
    ]);

    setUser(data.user);

    return true;
  }

  async function signOut() {
    await authService.logout();
    await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY, USER]);
    setUser(null);
  }

  async function refresh() {
    const token = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    await authService.refresh(token);
    await AsyncStorage.multiSet([
      [TOKEN_KEY, data.token],
      [REFRESH_TOKEN_KEY, data.refreshToken],
    ]);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export default AuthContext;
