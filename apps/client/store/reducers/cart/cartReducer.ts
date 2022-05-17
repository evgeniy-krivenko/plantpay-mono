import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchInCart, addInCart, removeFromCart } from './thuks';

export const initialState = {
  cartId: '' as string,
  inCart: [] as string[],
  isLoadingById: [] as string[],
  errorsById: {} as Record<string, string | undefined>,
  errorFetchInCart: '',
};

export const cartSlice = createSlice({
  name: 'inCart',
  initialState,
  reducers: {
    setCartId: (state, action: PayloadAction<string>) => {
      state.cartId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInCart.fulfilled, (state, action) => {
      state.inCart = action.payload.inCart;
      state.cartId = action.payload.cartId;
      if (state.errorFetchInCart) {
        state.errorFetchInCart = '';
      }
    });
    builder.addCase(fetchInCart.rejected, (state, action) => {
      state.errorFetchInCart = action.payload;
    });
    builder.addCase(addInCart.fulfilled, (state, action) => {
      state.inCart = action.payload;
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
  },
});

export default cartSlice.reducer;

export const { setCartId } = cartSlice.actions;
