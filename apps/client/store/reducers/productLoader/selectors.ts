import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ImageForUpload } from './photoLoaderReducer';
import { IImageElement } from '@plantpay-mono/types';

const selectSelf = (state: RootState): RootState => state;
export const isHaveImagesUploadSelector = createSelector(
  selectSelf,
  (state: RootState): boolean => state.productLoader.imagesForUpload.length > 0,
);

export const imagesUploadSelector = createSelector(
  selectSelf,
  (state: RootState): ImageForUpload[] => state.productLoader.imagesForUpload,
);

export const mainImageSelector = createSelector(selectSelf, (state: RootState): IImageElement | null => {
  for (const image of state.productLoader.images) {
    if (image.isMain) {
      return image;
    }
  }
  return null;
});

export const isMaxImagesSelector = createSelector(
  selectSelf,
  (state: RootState): boolean => state.productLoader.imagesForUpload.length === 5,
);

export const isCategoryIdSelector = createSelector(
  selectSelf,
  (state: RootState): boolean => state.productLoader.categoryId > 0,
);

export const categoryIdSelector = createSelector(
  selectSelf,
  (state: RootState): number => state.productLoader.categoryId,
);
