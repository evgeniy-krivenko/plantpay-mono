import { AxiosError, AxiosRequestConfig } from 'axios';
import $api from '../../http';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AppDispatch } from '../store';
import { IApiError } from '@plantpay-mono/types';

interface CustomQueryArgs extends AxiosRequestConfig {
  onSuccess?: (dispatch: AppDispatch, data) => Promise<void>;
}

export const axiosBaseQuery: BaseQueryFn<CustomQueryArgs, unknown, unknown> = async (
  { onSuccess, ...args },
  { dispatch },
  extraOptions,
) => {
  try {
    const response = await $api.request(args);

    if (onSuccess) {
      try {
        await onSuccess(dispatch, response.data);
      } catch (e) {
        console.error('Error in onSuccess method', e);
        throw e;
      }
    }

    return { data: response.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: err.response?.data || 'Internal error',
    };
  }
};
