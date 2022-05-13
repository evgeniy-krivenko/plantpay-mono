import { productSlice } from '../reducers/products/productReducer';

const { setError, addInCart, removeFromCart } = productSlice.actions;

export default {
  setError,
  addInCart,
  removeFromCart,
};
