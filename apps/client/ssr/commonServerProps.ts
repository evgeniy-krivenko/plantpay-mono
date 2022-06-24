import { NextThunkDispatch } from '../store';
import { AxiosRequestHeaders } from 'axios';
import Cookies from 'cookies';
import { PLANTPAY_CART_ID } from '@plantpay-mono/constants';
import { IncomingMessage, ServerResponse } from 'http';
import $api from '../http';
import { getExpireDate } from '../get-expire-date';
import { fetchInCart } from '../store/reducers/cart/cartApi';
import { getRunningOperationPromises } from '../store/api';
import { fetchAuthUser } from '../store/reducers/auth/authApi';

interface CommonServerProps {
  req: IncomingMessage;
  res: ServerResponse;
}

export const commonServerProps =
  (store) =>
  async ({ req, res }: CommonServerProps): Promise<any> => {
    const dispatch = store.dispatch as NextThunkDispatch;
    const headers = req.headers as AxiosRequestHeaders;

    await Promise.all([dispatch(fetchInCart.initiate(headers)), dispatch(fetchAuthUser.initiate(headers))]);

    const cookiesWithTokens = $api.defaults.headers['setCookie'];
    if (cookiesWithTokens) {
      res.setHeader('set-cookie', cookiesWithTokens);
    }
    const state = store.getState();
    const cartId = state.cart.cartId;

    if (cartId) {
      const cookies = new Cookies(req, res);
      cookies.set(PLANTPAY_CART_ID, cartId, {
        expires: getExpireDate(30),
        sameSite: 'lax',
        httpOnly: false,
      });
    }

    await Promise.all(getRunningOperationPromises());
  };
