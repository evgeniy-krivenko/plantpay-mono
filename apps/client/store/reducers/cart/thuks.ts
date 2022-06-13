import { InCart, IVendorWithProduct } from '@plantpay-mono/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosRequestHeaders } from 'axios';
import { ParsedUrlQuery } from 'node:querystring';
import $api from '../../../http';

// async actions
export const fetchInCart = createAsyncThunk<InCart, AxiosRequestHeaders, { rejectValue: string }>(
  'cart/fetchInCart',
  async (headers, thunkAPI) => {
    try {
      const response = await $api.get('/cart', { headers });
      console.log(response?.data)
      return response?.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Что-то пошло не так, попробуйте позже');
    }
  },
);

export type AddInCartArgs = {
  cartId: string;
  productId: string;
};

export const addInCart = createAsyncThunk<string[], AddInCartArgs, { rejectValue: string }>(
  'cart/addInCart',
  async ({ cartId, productId }, thunkAPI) => {
    try {
      const response = await $api.put(`/cart/${cartId}`, { productId });
      return response?.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Что-то пошло не так, попробуйте позже');
    }
  },
);

export const removeFromCart = createAsyncThunk<string[], AddInCartArgs, { rejectValue: string }>(
  'cart/removeFromCart',
  async ({ cartId, productId }, thunkAPI) => {
    try {
      const response = await $api.delete(`/cart/${cartId}`, { data: { productId } });
      return response?.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Что-то пошло не так, попробуйте позже');
    }
  },
);

export const fetchVendorsWithItems = createAsyncThunk<
  IVendorWithProduct[],
  AxiosRequestHeaders,
  { rejectValue: string }
>('cart/fetchVendorsWithItems', async (headers, thunkAPI) => {
  try {
    const response = await $api.get('/cart/all', { headers });
    return response?.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue('Что-то пошло не так, попробуйте позже');
  }
});
