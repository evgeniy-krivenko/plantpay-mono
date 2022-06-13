import { IImageElement, IProductForUsers } from '@plantpay-mono/types';
import { Product } from '../product.entity';
import { Expose, Transform, Type } from 'class-transformer';
import { ImageDto } from './image.dto';

export class ProductForUsersDto implements IProductForUsers {
  @Expose()
  categoryId: number;
  @Expose()
  description: string;
  @Expose()
  id: string;
  /**
   * Select main image
   * if image url has not 'static' in path
   * add it
   */
  @Expose()
  @Transform(({ value }) => {
    return value.filter((image: IImageElement) => image.isMain);
  })
  @Type(() => ImageDto)
  images: IImageElement[];
  @Expose()
  name: string;
  @Expose()
  @Type(() => Number)
  price: number;
  @Expose()
  slug: string;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
