import { ICategory, IProductForUsers } from '@plantpay-mono/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http';

// async actions
export const fetchCategories = createAsyncThunk<ICategory[], null, { rejectValue: string }>(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await $api.get('/categories');
      return response?.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Что-то пошло не так, попробуйте позже');
    }
  },
);
