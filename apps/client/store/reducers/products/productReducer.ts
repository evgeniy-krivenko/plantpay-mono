import { IProductWithCart } from '@plantpay-mono/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from './thunks';

export const initialState = {
  cart: [] as string[],
  products: [] as IProductWithCart[],
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
    addInCart: (state, action: PayloadAction<string>) => {
      state.cart.push(action.payload);
      state.products.forEach((product) => {
        if (product.id === action.payload) {
          product.inCart = true;
        }
      });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((id) => id !== action.payload);
      state.products.forEach((product) => {
        if (product.id === action.payload) {
          product.inCart = false;
        }
      });
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

export const { setError, addInCart, removeFromCart } = productSlice.actions;
