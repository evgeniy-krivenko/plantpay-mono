import { IImageElement } from '@plantpay-mono/types';
import BigNumber from 'bignumber.js';

export interface IProductForUsers {
  id: string;
  name: string;
  description: string;
  images: IImageElement[];
  categoryId: number;
  slug: string;
  price: BigNumber;
}
