import { productSlice } from './productReducer';
import { fetchProducts } from './thunks';

// async and sync actions

export default {
  ...productSlice.actions,
  fetchProducts,
};
