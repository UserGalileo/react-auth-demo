import axios from "axios";

import { refreshToken } from "./refresh-token";

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

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error?.config;

      if (error?.response?.status === 401 && !config?.sent) {
        config.sent = true;

        const result = await refreshToken();

        if (result?.access_token) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${result?.access_token}`,
          };
        }

        return axios(config);
      }
      return Promise.reject(error);
    }
);

export const http = axios;
