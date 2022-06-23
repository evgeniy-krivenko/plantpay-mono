import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IVendorWithProduct } from '@plantpay-mono/types';

export const selectInCart = (state: RootState) => state.cart.inCart;
export const inCartSelector = createSelector(
  selectInCart,
  (state, productId: string) => productId,
  (inCart: string[], productId: string) => inCart.some((id) => id === productId),
);

const selectIsLoading = (state: RootState) => state.cart.isLoadingById;
export const isLoadingSelector = createSelector(
  selectIsLoading,
  (_, productId: string) => productId,
  (isLoadingById: string[], productId: string) => {
    return isLoadingById.some((id) => id === productId);
  },
);

export const inCartCount = createSelector([selectInCart], (inCart: string[]) => inCart.length);

export const vendorsWithProductsSelector = (state: RootState): IVendorWithProduct[] => state.cart.vendorsWithProducts;
export const checkedProductInCartSelector = (state: RootState): string[] => state.cart.checkedProductInCart;

export const isCheckedProductInCartSelector = createSelector(
  checkedProductInCartSelector,
  (state, productId: string): string => productId,
  (checkedProductsInCart, productId) => checkedProductsInCart.includes(productId),
);

/**
 * Count price for all products if it checked in cart
 */
export const productsPriceSelector = createSelector(
  [vendorsWithProductsSelector, checkedProductInCartSelector],
  (vendorsWithProducts, checkedProductsInCart) => {
    let price = 0;
    for (const vendor of vendorsWithProducts) {
      for (const product of vendor.products) {
        if (checkedProductsInCart.includes(product.id)) {
          price += product.price;
        }
      }
    }
    return price;
  },
);
