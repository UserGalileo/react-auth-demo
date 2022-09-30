import { AuthEndpoints } from '../models/auth';

export const endpoints: AuthEndpoints = {
  domain: 'http://localhost:3000',
  login: '/login',
  logout: '/logout',
  register: '/register',
  userInfo: '/me',
  refreshToken: '/token'
}
