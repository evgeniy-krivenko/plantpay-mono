/* eslint-disable import/no-anonymous-default-export */
import productsActions from '../reducers/products/actions';
import inCartActions from '../reducers/cart/actions';
import authActions from '../reducers/auth/actions';

export default {
  ...productsActions,
  ...inCartActions,
  ...authActions,
};
