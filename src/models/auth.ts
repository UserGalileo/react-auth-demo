export interface AuthEndpoints {
  domain: string;
  login: string;
  logout: string;
  register: string;
  userInfo: string;
  refreshToken: string;
}

export interface User {
  email: string;
  displayName: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export type RegisterCredentials = Credentials & {
  name: string;
  surname: string;
}
