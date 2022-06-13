import { GetServerSidePropsContext } from 'next';
import { NextThunkDispatch } from '../store';
import { AxiosRequestHeaders } from 'axios';
import Cookies from 'cookies';
import { PLANTPAY_CART_ID } from '@plantpay-mono/constants';
import { fetchInCart } from '../store/reducers/cart/thuks';
import { fetchUser } from '../store/reducers/auth/thuks';
import { IncomingMessage, ServerResponse } from 'http';

interface CommonServerProps {
  req: IncomingMessage;
  res: ServerResponse;
}

export const commonServerProps =
  (store) =>
  async ({ req, res }: CommonServerProps): Promise<any> => {
    const dispatch = store.dispatch as NextThunkDispatch;
    const headers = req.headers as AxiosRequestHeaders;
    await Promise.all([dispatch(fetchInCart(headers)), dispatch(fetchUser(headers))]);
    const state = store.getState();
    const cookies = new Cookies(req, res);
    cookies.set(PLANTPAY_CART_ID, state.cart.cartId || '');
  };
