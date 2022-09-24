import create from 'zustand';
import * as http from '../http';

export interface AuthEndpoints {
  domain: string;
  login: string;
  logout: string;
  register: string;
  userInfo: string;
  csrfToken: string;
}

export interface User {
  email: string;
  displayName: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export type RegisterCredentials = Credentials & {
  name: string;
  surname: string;
}

interface AuthStore {
  init: () => Promise<unknown>,
  user: User | null,
  login: (cred: Credentials) => Promise<User | null>,
  logout: () => Promise<boolean>,
  register: (cred: RegisterCredentials) => Promise<unknown>,
  fetchUser: (force?: boolean) => Promise<User | null>
}

export const endpoints: AuthEndpoints = {
  domain: 'http://localhost:3000',
  login: '/login',
  logout: '/logout',
  register: '/register',
  userInfo: '/me',
  csrfToken: '/csrf-token'
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  init: () => {
    return http.get(endpoints.domain + endpoints.csrfToken)
  },
  login: (credentials) => {
    return http.post<Credentials, User>(endpoints.domain + endpoints.login, credentials)
        .then(() => get().fetchUser());
  },
  logout: () => {
    return http.get<unknown>(endpoints.domain + endpoints.logout)
        .then(() => true)
        .catch(() => false)
        .finally(() => {
          set({ user: null })
        })
  },
  register: (credentials) => {
    return http.post<RegisterCredentials, unknown>(endpoints.domain + endpoints.register, credentials);
  },
  fetchUser: (force = false) => {
    if (get().user && !force) return Promise.resolve(get().user);
    return http.get<User>(endpoints.domain + endpoints.userInfo)
        .then(user => {
          if (!user) return null;
          set({ user });
          return user;
        })
        .catch(() => {
          return null;
        })
  }
}));
