import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectInCart = (state: RootState) => state.inCart.inCart;
export const inCartSelector = createSelector(
  selectInCart,
  (state, productId: string) => productId,
  (inCart: string[], productId: string) => inCart.some((id) => id === productId),
);

const selectIsLoading = (state: RootState) => state.inCart.isLoadingById;
export const isLoadingSelector = createSelector(
  selectIsLoading,
  (_, productId: string) => productId,
  (isLoadingById: string[], productId: string) => isLoadingById.some((id) => id === productId),
);

export const inCartCount = createSelector([selectInCart], (inCart: string[]) => inCart.length);
