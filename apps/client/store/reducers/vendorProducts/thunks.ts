import { CreateProduct, IProductForVendor } from '@plantpay-mono/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ParsedUrlQuery } from 'node:querystring';
import $api from '../../../http';
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { ProductForm } from '../../../components/AddProductPopup/components';
import { RootState } from '../../store';

export interface FetchVendorProductsParams {
  params: ParsedUrlQuery;
  headers?: AxiosRequestHeaders;
}

// async actions
export const fetchVendorProducts = createAsyncThunk<IProductForVendor[], AxiosRequestConfig, { rejectValue: string }>(
  'vendorProducts/fetchVendorProducts',
  async ({ params, headers }, thunkAPI) => {
    console.log(headers);
    try {
      const response = await $api.get('dashboard/products', { params, headers });
      return response?.data;
    } catch (e: any) {
      console.log(e);
      return thunkAPI.rejectWithValue('Что-то пошло не так, попробуйте позже');
    }
  },
);

export const createProduct = createAsyncThunk<IProductForVendor, ProductForm, { rejectValue: string }>(
  'vendorProducts/createProduct',
  async ({ name, description, price }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { categoryId, images } = state.productLoader;
    const data: CreateProduct = { name, price, description, categoryId, images };
    try {
      const response = await $api.post('dashboard/add-product', data);
      return response?.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Что-то пошло не так, попробуйте позже');
    }
  },
);
