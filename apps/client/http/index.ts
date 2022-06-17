import axios from 'axios';
import { BASE_SERVER_URL } from '../configs/urls';
import { makeStore } from '../store';
import { authActions } from '../store/reducers/auth/authReducer';
import { checkExecutionCtx } from '@plantpay-mono/helpers';
import cookie from 'cookie';
import { IRefresh } from '@plantpay-mono/types';

let accessToken: string;

const $api = axios.create({
  withCredentials: true,
  timeout: 8000,
  baseURL: BASE_SERVER_URL,
});

/**
 * If there isn't token in closes
 * extract from cookie (server and client)
 */
$api.interceptors.request.use(async (req) => {
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
  }

  let cookiesForParse;

  const isServer = checkExecutionCtx();
  if (isServer) {
    cookiesForParse = req.headers?.cookie;
  } else {
    cookiesForParse = document.cookie;
  }

  if (!accessToken && typeof cookiesForParse === 'string') {
    const cookies = cookie.parse(cookiesForParse);
    const accessTokenFromCookie = cookies['Access-token'];
    if (accessTokenFromCookie) {
      accessToken = accessTokenFromCookie;
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return req;
});

export default $api;

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    const store = makeStore();
    if (error.response?.status === 401 && error.config && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const { data, headers } = await $api.get<IRefresh>(`/auth/refresh`, {
          headers: originalRequest.headers,
        });
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        accessToken = data.access_token;
        $api.defaults.headers['setCookie'] = headers['set-cookie'];
        return await $api.request(originalRequest);
      } catch (e) {
        let message: string;
        if (e.response?.status === 401) {
          message = e.response?.message;
        } else {
          message = 'Что-то пошло не так';
        }
        store.dispatch(authActions.setErrorAuth(message));
      }
    }
    throw error;
  },
);
