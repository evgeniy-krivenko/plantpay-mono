import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectSelf = (state: RootState): RootState => state;
export const productSelector = createSelector(
  selectSelf,
  (state: RootState) => state.products.products,
);
