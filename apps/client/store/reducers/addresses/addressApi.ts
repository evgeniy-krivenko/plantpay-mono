import { api, tagTypes } from '../../api';
import { ICustomerAddress, OrderAddress } from '@plantpay-mono/types';

export const addressApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchAddresses: build.query<ICustomerAddress[], void>({
      query: () => ({
        url: '/address',
        method: 'GET',
      }),
      providesTags: () => [tagTypes.addresses],
    }),
    addAddress: build.mutation<void, OrderAddress>({
      query: (data) => ({
        url: '/address',
        method: 'POST',
        data,
      }),
      invalidatesTags: () => [tagTypes.addresses],
    }),
  }),
});

export const { useFetchAddressesQuery, useAddAddressMutation } = addressApi;
