import { NextThunkDispatch, wrapper } from '../store';
import { fetchCategories } from '../store/reducers/categories/thunks';
import { fetchProducts } from '../store/reducers/products/thunks';
import { fetchInCart } from '../store/reducers/cart/thuks';
import { fetchUser } from '../store/reducers/auth/thuks';
import { PLANTPAY_CART_ID } from '@plantpay-mono/constants';
import Cookies from 'cookies';
import { AxiosRequestHeaders } from 'axios';

export const catalogSSP = wrapper.getServerSideProps((store) => async ({ query, req, res }): Promise<any> => {
  const dispatch = store.dispatch as NextThunkDispatch;
  /* below it's setting cookie from header
   * because they are not throw from and to the server
   * */
  const headers = req.headers as AxiosRequestHeaders;
  await Promise.all([
    dispatch(fetchCategories()),
    dispatch(fetchProducts(query)),
    dispatch(fetchInCart(headers)),
    dispatch(fetchUser(headers)),
  ]);
  const state = store.getState();
  const cookies = new Cookies(req, res);
  cookies.set(PLANTPAY_CART_ID, state.inCart.cartId || '');
});
