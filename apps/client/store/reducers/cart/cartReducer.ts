import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InCart, IVendorWithProduct } from '@plantpay-mono/types';

export const initialState = {
  cartId: null as string,
  inCart: [] as string[],
  isLoadingById: [] as string[],
  errorsById: {} as Record<string, string | undefined>,
  errorFetchInCart: '',
  vendorsWithProducts: [] as IVendorWithProduct[],
  errorFetchVendorsWithProducts: '' as string,
  checkedProductInCart: [] as string[],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartId: (state, action: PayloadAction<string>) => {
      state.cartId = action.payload;
    },
    setInCart: (state, action: PayloadAction<string[]>) => {
      state.inCart = action.payload;
    },
    setInCartAndId: (state, action: PayloadAction<InCart>) => {
      state.inCart = action.payload.inCart;
      state.cartId = action.payload.cartId;
      state.checkedProductInCart = action.payload.inCart;
    },
    toggleCheckedProductInCart: (state, action: PayloadAction<string>) => {
      const index = state.checkedProductInCart.indexOf(action.payload);
      if (index >= 0) {
        state.checkedProductInCart.splice(index, 1); // if element in arr, delete it
      } else {
        state.checkedProductInCart.push(action.payload);
      }
    },
    setVendorsWithProduct: (state, action: PayloadAction<IVendorWithProduct[]>) => {
      state.vendorsWithProducts = action.payload;
    },
  },
});

export default cartSlice.reducer;

export const { actions: cartActions } = cartSlice;
