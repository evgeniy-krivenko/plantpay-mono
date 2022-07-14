import { api, tagTypes } from '../../api';
import { ICreateOrders } from '@plantpay-mono/types';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<void, ICreateOrders>({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        data,
      }),
      invalidatesTags: () => [tagTypes.orders],
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
