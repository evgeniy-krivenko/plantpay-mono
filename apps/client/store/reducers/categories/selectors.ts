import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ICategory } from '@plantpay-mono/types';

const selectSelf = (state: RootState): RootState => state;
export const categorySelector = createSelector(
  selectSelf,
  (state: RootState): ICategory[] => state.categories.categories,
);
