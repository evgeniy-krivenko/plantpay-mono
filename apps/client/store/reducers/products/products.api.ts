import { api } from '../../api';
import { IProductForUsers } from '@plantpay-mono/types';
import { AxiosRequestHeaders } from 'axios';

interface FetchOneProductRequest {
  slug?: string;
  headers?: AxiosRequestHeaders;
}

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchOneProduct: build.query<IProductForUsers, FetchOneProductRequest | undefined>({
      query: ({ slug, headers }) => ({
        url: '/products/' + slug,
        method: 'GET',
        headers,
      }),
    }),
  }),
});

export const { useFetchOneProductQuery } = productApi;

export const { fetchOneProduct } = productApi.endpoints;
