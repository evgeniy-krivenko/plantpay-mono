import { IProductForVendor } from '@plantpay-mono/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchVendorProducts, createProduct } from './thunks';

export const initialState = {
  products: [] as IProductForVendor[],
  isLoading: false,
  error: '',
  isSuccessCreateProduct: false,
};

export const vendorProductSlice = createSlice({
  name: 'vendorProducts',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetIsSuccessCreateProduct: (state) => {
      state.isSuccessCreateProduct = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVendorProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchVendorProducts.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.isLoading = false;
      state.isSuccessCreateProduct = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createProduct.pending, (state, _) => {
      state.error = '';
      state.isLoading = true;
    });
  },
});

export default vendorProductSlice.reducer;
