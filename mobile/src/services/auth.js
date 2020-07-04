import api from './api';

async function _getProfile() {
  const { data: user } = await api.get('profile');
  console.log(user);

  return user;
}

export function setAuthHeader(token, clear = false) {
  const value = clear ? '' : `Bearer ${token}`;
  api.defaults.headers.common.Authorization = value;
}

export async function login(email, password) {
  const {
    data: { token, refreshToken },
  } = await api.post('auth/signin', { email, password });

  setAuthHeader(token);

  const user = await _getProfile();

  return { token, refreshToken, user };
}

export async function refresh(storedToken) {
  const {
    data: { token, refreshToken },
  } = await api.post('auth/refresh', { refreshToken: storedToken });

  setAuthHeader(token);

  return { token, refreshToken };
}

export async function logout() {
  setAuthHeader('', true);
}
