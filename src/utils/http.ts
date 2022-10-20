import axios from "axios";

import { refreshToken } from "./refresh-token";
import { endpoints } from './endpoints';

/**
 * This interceptor appends the AccessToken to every request.
 */
axios.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem('access_token');

      if (token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${token}`,
        };
      }

      return config;
    },
    (error) => Promise.reject(error)
);

/**
 * This interceptor tries to refresh the AccessToken.
 */
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error?.config;

      const was401  = error?.response?.status === 401;
      const wasNotRefreshToken = error?.request.responseURL !== (endpoints.domain + endpoints.refreshToken);

      /**
       * If it's a 401 error (forbidden), and the request was NOT
       * to refresh the token (avoid loops), try to refresh the token.
       */
      if (was401 && wasNotRefreshToken) {

        const result = await refreshToken();

        if (result?.access_token) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${result?.access_token}`,
          };
        }

        // Do the original request once again,
        // with the new AccessToken.
        return axios(config);
      }
      return Promise.reject(error);
    }
);

export const http = axios;
