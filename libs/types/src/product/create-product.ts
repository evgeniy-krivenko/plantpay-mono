import { IImageElement } from '@plantpay-mono/types';

export interface CreateProduct {
  name: string;
  description: string;
  categoryId: number;
  price: number;
  images: IImageElement[];
}
