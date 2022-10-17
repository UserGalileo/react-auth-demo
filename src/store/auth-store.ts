import create from 'zustand';
import { User } from '../models/auth';
import { UserManager, User as OidcUser } from 'oidc-client';
import { config } from '../utils/oauth-config';

const userManager = new UserManager(config);

function extractUser(user: OidcUser | null): User | null {
  if (user) {
    const { email, name: displayName } = user.profile;
    return { email, displayName } as User;
  }
  return null;
}

interface AuthStore {
  user: User | null;
  getAccessToken: () => Promise<string | undefined>;
  fetchUser: () => Promise<User | null>;
  login: () => Promise<boolean>;
  completeAuthentication: () => Promise<any>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  getAccessToken() {
    return userManager.getUser().then(user => user?.access_token);
  },
  fetchUser() {
    return userManager.getUser().then(u => {
      const user = extractUser(u);
      set({ user });
      return user;
    });
  },
  login() {
    return userManager.signinPopup().then(
        user => {
          console.log(user);
          set({ user: extractUser(user) });
          return true;
        }
    ).catch((e) => {
      console.log(e)
      return false;
    })
  },
  completeAuthentication() {
    return userManager.signinPopupCallback(window.location.href);
  },
  logout() {
    userManager.removeUser().then(() => {
      set({ user: null });
    })
  }
}));
