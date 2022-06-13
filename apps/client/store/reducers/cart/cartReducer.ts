import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchInCart, addInCart, removeFromCart, fetchVendorsWithItems } from './thuks';
import { IVendorWithProduct } from '@plantpay-mono/types';

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
    toggleCheckedProductInCart: (state, action: PayloadAction<string>) => {
      const index = state.checkedProductInCart.indexOf(action.payload)
      if (index >= 0) {
        state.checkedProductInCart.splice(index, 1); // if element in arr, delete it
      } else {
        state.checkedProductInCart.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInCart.fulfilled, (state, action) => {
      state.inCart = action.payload.inCart;
      state.cartId = action.payload.cartId;
      state.checkedProductInCart = action.payload.inCart;
      if (state.errorFetchInCart) {
        state.errorFetchInCart = '';
      }
    });
    builder.addCase(fetchInCart.rejected, (state, action) => {
      state.errorFetchInCart = action.payload;
      state.cartId = '';
      state.inCart = [];
    });
    builder.addCase(addInCart.fulfilled, (state, action) => {
      state.inCart = action.payload;
      state.checkedProductInCart = action.payload;
      state.isLoadingById = state.isLoadingById.filter((id) => id !== action.meta.arg.productId);
      if (state.errorsById[action.meta.arg.productId]) {
        state.errorsById[action.meta.arg.productId] = '';
      }
    });
    builder.addCase(addInCart.pending, (state, action) => {
      state.isLoadingById.push(action.meta.arg.productId);
    });
    builder.addCase(addInCart.rejected, (state, action) => {
      state.errorsById[action.meta.arg.productId] = action.payload;
      state.isLoadingById = state.isLoadingById.filter((id) => id !== action.meta.arg.productId);
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.inCart = action.payload;
      state.checkedProductInCart = state.checkedProductInCart.filter((id) => id !== action.meta.arg.productId);
      state.isLoadingById = state.isLoadingById.filter((id) => id !== action.meta.arg.productId);
      if (state.errorsById[action.meta.arg.productId]) {
        state.errorsById[action.meta.arg.productId] = '';
      }
    });
    builder.addCase(removeFromCart.pending, (state, action) => {
      state.isLoadingById.push(action.meta.arg.productId);
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.errorsById[action.meta.arg.productId] = action.payload;
      state.isLoadingById = state.isLoadingById.filter((id) => id !== action.meta.arg.productId);
    });
    builder.addCase(fetchVendorsWithItems.fulfilled, (state, action) => {
      state.vendorsWithProducts = action.payload;
    });
    builder.addCase(fetchVendorsWithItems.rejected, (state, action) => {
      state.errorFetchVendorsWithProducts = action.payload;
    });
  },
});

export default cartSlice.reducer;

export const { actions: cartActions } = cartSlice;
