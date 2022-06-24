import { api } from '../../api';
import { ISignIn, ISignUp, IUser } from '@plantpay-mono/types';
import { AxiosRequestHeaders } from 'axios';
import { authActions } from './authReducer';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchAuthUser: build.query<IUser, AxiosRequestHeaders>({
      query: (headers) => ({
        url: '/auth/profile',
        method: 'GET',
        headers,
        onSuccess: async (dispatch, data: IUser): Promise<void> => {
          dispatch(authActions.setSuccessAuth(data));
        },
      }),
    }),
    signIn: build.mutation<IUser, ISignIn>({
      query: (data) => ({
        url: '/auth/sign-in',
        method: 'POST',
        data,
        onSuccess: async (dispatch, data: IUser): Promise<void> => {
          dispatch(authActions.setSuccessAuth(data));
        },
      }),
    }),
    signUp: build.mutation<IUser, ISignUp>({
      query: (data) => ({
        url: '/auth/sign-up',
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;

export const { fetchAuthUser } = authApi.endpoints;
