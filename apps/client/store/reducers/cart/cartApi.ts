import { api, tagTypes } from '../../api';
import { cartActions } from './cartReducer';
import { AxiosRequestHeaders } from 'axios';
import { InCart, IVendorWithProduct } from '@plantpay-mono/types';

interface AddInCartRequest {
  cartId: string;
  productId: string;
}

export const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchInCart: build.query<string[], AxiosRequestHeaders>({
      query: (headers) => ({
        url: '/cart',
        method: 'GET',
        headers,
        onSuccess: async (dispatch, data: InCart): Promise<void> => {
          dispatch(cartActions.setInCartAndId(data));
        },
      }),
    }),
    addInCart: build.mutation<string[], AddInCartRequest>({
      query: ({ cartId, productId }) => ({
        url: '/cart/' + cartId,
        method: 'PUT',
        data: { productId },
        onSuccess: async (dispatch, data: string[]): Promise<void> => {
          dispatch(cartActions.setInCart(data));
        },
      }),
    }),
    removeFromCart: build.mutation<string[], AddInCartRequest>({
      query: ({ cartId, productId }) => ({
        url: '/cart/' + cartId,
        method: 'DELETE',
        data: { productId },
        onSuccess: async (dispatch, data: string[]): Promise<void> => {
          dispatch(cartActions.setInCart(data));
        },
      }),
    }),
    fetchVendorsWithProduct: build.query<IVendorWithProduct[], AxiosRequestHeaders>({
      query: (headers) => ({
        url: '/cart/all',
        method: 'GET',
        headers,
        onSuccess: async (dispatch, data: IVendorWithProduct[]): Promise<void> => {
          dispatch(cartActions.setVendorsWithProduct(data));
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useAddInCartMutation, useRemoveFromCartMutation, useFetchInCartQuery } = cartApi;

export const { fetchInCart, fetchVendorsWithProduct } = cartApi.endpoints;
