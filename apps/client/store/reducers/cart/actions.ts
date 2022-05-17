import { fetchInCart, addInCart, removeFromCart } from './thuks';
import { cartSlice } from './cartReducer';

export default {
  fetchInCart,
  addInCart,
  removeFromCart,
  ...cartSlice.actions,
};
