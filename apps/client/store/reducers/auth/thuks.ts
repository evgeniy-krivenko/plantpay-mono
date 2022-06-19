import { ISignIn, ISignUp, IUser } from '@plantpay-mono/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosRequestHeaders } from 'axios';
import $api from '../../../http';

// async actions
export const fetchUser = createAsyncThunk<IUser, AxiosRequestHeaders, { rejectValue: string }>(
  'auth/fetchUser',
  async (headers, thunkAPI) => {
    try {
      const response = await $api.get('/auth/profile', { headers });
      return response?.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Вы не авторизованы');
    }
  },
);

export const signIn = createAsyncThunk<IUser, ISignIn, { rejectValue: string }>(
  'auth/signIn',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await $api.post('/auth/sign-in', { email, password });
      return response?.data;
    } catch (e: any) {
      if (e.response?.status === 401) {
        return thunkAPI.rejectWithValue('Неверный логин или пароль');
      }
      return thunkAPI.rejectWithValue('Что-то пошло не так. Попробуйте позже');
    }
  },
);

export const signUp = createAsyncThunk<IUser, ISignUp, { rejectValue: string }>(
  'auth/signUp',
  async (data, thunkAPI) => {
    try {
      const response = await $api.post('/auth/sign-up', data);
      return response?.data;
    } catch (e: any) {
      if (e.response?.status === 400) {
        return thunkAPI.rejectWithValue('Вы указали неверные данные');
      }
      return thunkAPI.rejectWithValue('Что-то пошло не так. Попробуйте позже');
    }
  },
);

