import { http } from './http';
import mem from 'mem';
import { Tokens } from '../models/auth';
import { endpoints } from './endpoints';

const refreshTokenFn = async () => {
  const token = localStorage.getItem("refresh_token");

  try {
    const response = await http.post<Tokens>(endpoints.domain + endpoints.refreshToken, {
      refresh_token: token,
    });

    const { access_token, refresh_token } = response.data;

    if (!access_token) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    } else {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    }

    return response.data;
  } catch (error) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    throw error;
  }
};

const maxAge = 10000;

export const refreshToken = mem(refreshTokenFn, {
  maxAge,
});
