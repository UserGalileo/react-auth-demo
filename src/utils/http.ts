import axios from "axios";


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

export const http = axios;
