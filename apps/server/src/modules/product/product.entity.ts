import BigNumber from 'bignumber.js';
import { v4 as uuid } from 'uuid';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { ImageElementDto } from '../files/dto/image-element.dto';
import { ProductStatus } from '@prisma/client';
import { User } from '../auth/user.entity';
import { ICategory } from '@plantpay-mono/types';

export interface IProduct {
  name: string;
  description: string;
  vendorId: number;
  categoryId: number;
  price: BigNumber | number;
  images: ImageElementDto[];
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  category?: ICategory;
  status?: ProductStatus;
  slug?: string;
  vendor?: User;
}
export class Product {
  name: string;
  description: string;
  vendorId: number;
  categoryId: number;
  readonly price: BigNumber | number;
  images: ImageElementDto[];
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  category?: ICategory;
  status?: ProductStatus;
  slug?: string;
  vendor?: User;

  constructor(partial: IProduct) {
    Object.assign(this, partial);

    if (typeof this.price === 'number') {
      this.price = new BigNumber(partial.price);
    }
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.slug) {
      const transiledName = CyrillicToTranslit().transform(this.name, '-');
      if (!this.category) {
        throw new Error('Must be a category for create slug');
      }
      this.slug = `/${this.category.slug}/${transiledName.toLocaleLowerCase()}-${this.id}`;
    }
  }
}
