import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IPagination } from '@plantpay-mono/types';

const selectSelf = (state: RootState): RootState => state;
export const productSelector = createSelector(
  selectSelf,
  (state: RootState) => state.products.products,
);

export const productPaginationSelector = (state: RootState): IPagination => state.products.pagination;
