import { ProductStatus } from '@prisma/client';
import { IImageElement } from '../file/file-element.interface';

export interface IProductForVendor {
  id: string;
  name: string;
  description: string;
  images: IImageElement[];
  categoryId: number;
  vendorId: number;
  slug: string;
  price: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}
