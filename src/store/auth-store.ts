import create from 'zustand';
import { http } from '../utils/http';
import { Credentials, RegisterCredentials, Tokens, User } from '../models/auth';
import { endpoints } from '../utils/endpoints';

interface AuthStore {
  user: User | null,
  login: (cred: Credentials) => Promise<User | null>,
  logout: () => Promise<boolean>,
  register: (cred: RegisterCredentials) => Promise<unknown>,
  fetchUser: (force?: boolean) => Promise<User | null>,
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  login: (credentials) => {
    return http.post<Tokens>(endpoints.domain + endpoints.login, credentials)
        .then(res => {
          const { access_token, refresh_token } = res.data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          return get().fetchUser();
        })
  },
  logout: () => {
    return http.post<unknown>(endpoints.domain + endpoints.logout, {
      refresh_token: localStorage.getItem('refresh_token')
    })
        .then(() => true)
        .catch(() => false)
        .finally(() => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          set({ user: null });
        })
  },
  register: (credentials) => {
    return http.post<unknown>(endpoints.domain + endpoints.register, credentials);
  },
  fetchUser: (force = false) => {
    if (get().user && !force) return Promise.resolve(get().user);
    return http.get<User>(endpoints.domain + endpoints.userInfo)
        .then(({ data: user }) => {
          if (!user) return null;
          set({ user });
          return user;
        })
        .catch(() => {
          return null;
        })
  }
}));
