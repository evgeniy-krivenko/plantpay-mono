import { IProductForUsers, IProductWithCart } from '@plantpay-mono/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from './thunks';

export const initialState = {
  cart: [] as string[],
  products: [] as IProductForUsers[],
  isLoading: false,
  error: '',
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.map((p) => ({ ...p, inCart: state.cart.includes(p.id) }));
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
