import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { axiosBaseQuery } from './axiosBaseQuery';

export const tagTypes = {
  products: 'Products',
  inCart: 'InCart',
} as const;

export type TagType = typeof tagTypes[keyof typeof tagTypes];

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery,
  tagTypes: Array.from(Object.values(tagTypes)),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});

export const { getRunningOperationPromises } = api.util;
