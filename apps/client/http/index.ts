import axios from 'axios';
import { BASE_URL, BASE_SERVER_URL } from '../configs/urls';
import { makeStore } from '../store';
import { authActions } from '../store/reducers/auth/authReducer';
import { checkExecutionCtx } from '@plantpay-mono/helpers';
import cookie from 'cookie';

let accessToken: string;

const $api = axios.create({
  withCredentials: true,
  timeout: 8000,
  baseURL: BASE_SERVER_URL,
});

$api.interceptors.request.use(async (req) => {
  const isServer = checkExecutionCtx();

  if (!accessToken && !isServer) {
    const cookies = cookie.parse(document.cookie);
    const accessTokenFromCookie = cookies['Access-token'];
    if (accessTokenFromCookie) {
      accessToken = accessTokenFromCookie;
    }
  }
  if (!accessToken) {
    axios
      .get(`${BASE_URL}/api/refresh`, {
        headers: req.headers,
      })
      .then(({ data }) => {
        accessToken = data.access_token;
      });
  }
  req.headers.Authorization = `Bearer ${accessToken}`;
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
        const { data } = await axios.get<any>(`${BASE_URL}/api/refresh`, {
          headers: originalRequest.headers,
        });
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        accessToken = data.access_token;
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
