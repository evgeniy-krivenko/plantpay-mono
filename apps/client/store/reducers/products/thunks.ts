import { IProductForUsers } from '@plantpay-mono/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ParsedUrlQuery } from 'node:querystring';
import $api from '../../../http';

// async actions
export const fetchProducts = createAsyncThunk<IProductForUsers[], ParsedUrlQuery | null, { rejectValue: string }>(
  'products/fetchProducts',
  async (params = {}, thunkAPI) => {
    try {
      const response = await $api.get('/products', { params });
      return response?.data;
    } catch (e: any) {
      console.log(e);
      return thunkAPI.rejectWithValue('Что-то пошло не так, попробуйте позже');
    }
  },
);
