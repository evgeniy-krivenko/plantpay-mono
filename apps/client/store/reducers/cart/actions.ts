import { fetchInCart, addInCart, removeFromCart } from './thuks';
import { cartActions } from './cartReducer';

export default {
  fetchInCart,
  addInCart,
  removeFromCart,
  ...cartActions,
};
