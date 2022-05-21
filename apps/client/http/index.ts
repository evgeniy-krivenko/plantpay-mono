import axios from 'axios';
import { BASE_URL } from '../configs/urls';
import { makeStore } from '../store';
import { IUser } from '@plantpay-mono/types';
import { authActions } from '../store/reducers/auth/authReducer';

const $api = axios.create({
  withCredentials: true,
  timeout: 8000,
  baseURL: BASE_URL,
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    const store = makeStore();
    if (error.response?.statusCode === 401 && error.config && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<IUser>(`${BASE_URL}/auth/refresh`, {
          withCredentials: true,
        });
        store.dispatch(authActions.setAuth({ user: response.data, isAuth: true }));
        return await $api.request(originalRequest);
      } catch (e) {
        let message: string;
        if (e.response?.statusCode === 401) {
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

export default $api;
