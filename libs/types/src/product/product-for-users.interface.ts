import { IImageElement } from '../file/file-element.interface';
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
