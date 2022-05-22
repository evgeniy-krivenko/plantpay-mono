import { NextThunkDispatch, wrapper } from '../store';
import { fetchCategories } from '../store/reducers/categories/thunks';
import { fetchProducts } from '../store/reducers/products/thunks';
import { fetchInCart } from '../store/reducers/cart/thuks';
import { fetchUser } from '../store/reducers/auth/thuks';
import { PLANTPAY_CART_ID } from '@plantpay-mono/constants';
import Cookies from 'cookies';

export const catalogSSP = wrapper.getServerSideProps((store) => async ({ query, req, res }): Promise<any> => {
  const dispatch = store.dispatch as NextThunkDispatch;
  const isNeedParams = !('limit' in query && 'offset' in query);
  if (isNeedParams) {
    query.limit = '20';
    query.offset = '0';
  }
  /* below it's setting cookie from header
   * because they are not throw from and to the server
   * */
  const cookiesFromReq = req.headers.cookie || '';
  await Promise.all([
    dispatch(fetchCategories()),
    dispatch(fetchProducts(query)),
    dispatch(fetchInCart({ Cookie: cookiesFromReq })),
    dispatch(fetchUser({ Cookie: cookiesFromReq })),
  ]);
  const state = store.getState();
  const cookies = new Cookies(req, res);
  cookies.set(PLANTPAY_CART_ID, state.inCart.cartId || '');
});
