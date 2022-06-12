import { vendorProductSlice } from './vendorProductReducer';
import { fetchVendorProducts, createProduct } from './thunks';

// async and sync actions

export default {
  ...vendorProductSlice.actions,
  fetchVendorProducts,
  createProduct,
};
