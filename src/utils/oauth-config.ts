import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';

// NB: Se il provider supporta il Code Flow with PKCE, usa la libreria "oidc-client-ts"!
// Google non lo supporta.
export const config: UserManagerSettings = {
  authority: 'http://accounts.google.com',
  client_id: '', // INSERT CLIENT ID HERE
  redirect_uri: 'http://localhost:4200/auth-callback',
  popup_redirect_uri: 'http://localhost:4200/auth-callback',
  response_type: 'id_token token',
  scope: 'openid profile https://www.googleapis.com/auth/userinfo.email',
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  max_age: 0,
  automaticSilentRenew: true,
  extraQueryParams: {
    force_verify: true
  }
}
