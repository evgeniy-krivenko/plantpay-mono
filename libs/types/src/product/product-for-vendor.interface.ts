import { ProductStatus } from '@prisma/client';
import { BigNumber } from 'bignumber.js';
import { IImageElement } from '../file/file-element.interface';

export interface IProductForVendor {
  id: string;
  name: string;
  description: string;
  images: IImageElement[];
  categoryId: number;
  vendorId: number;
  slug: string;
  price: BigNumber;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}
