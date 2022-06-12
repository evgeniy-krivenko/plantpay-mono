import axios from 'axios';
import { BASE_SERVER_URL } from '../../configs/urls';
import type { NextApiResponse } from 'next';
import Cookies from 'cookies';
import { getExpireDate, getExpireTime } from '../../get-expire-date';

export default async function handler(req, res: NextApiResponse): Promise<void> {
  let code: number;
  try {
    const response = await axios.get(`${BASE_SERVER_URL}/auth/refresh`, {
      headers: req.headers,
    });
    const cookies = new Cookies(req, res);
    cookies.set('Refresh-token', response.data.refresh_token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      expires: getExpireDate(14),
    });
    cookies.set('Access-token', response.data.access_token, {
      httpOnly: false,
      path: '/',
      sameSite: 'lax',
      expires: getExpireTime(1),
    });
    res.status(200).json({ access_token: response.data.access_token });
  } catch (e) {
    code = e.response?.status || 500;
    res.status(code).json({ message: e.response?.message });
  }
}
