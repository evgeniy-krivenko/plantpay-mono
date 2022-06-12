import { IImageElement, IProductForVendor } from '@plantpay-mono/types';
import { Expose, Transform, Type } from 'class-transformer';
import { ImageDto } from '../../product/dto/image.dto';
import { Product } from '../../product/product.entity';
import dayjs from 'dayjs';

export class ProductForVendorDto implements IProductForVendor {
  @Expose()
  categoryId: number;
  @Expose()
  @Transform(({ value }) => dayjs(value).format('DD.MM.YYYY'))
  createdAt: Date;
  @Expose()
  description: string;
  @Expose()
  id: string;
  @Expose()
  @Type(() => ImageDto)
  /**
   * if image url has not 'static' in path
   * add it
   */
  @Transform(({ value }) => {
    return value.map((imageElem: IImageElement) => {
      if (imageElem.url.split('/').includes('static')) {
        return imageElem;
      } else {
        return { ...imageElem, url: '/static/' + imageElem.url };
      }
    });
  })
  images: IImageElement[];
  @Expose()
  name: string;
  @Expose()
  @Type(() => Number)
  price: number;
  @Expose()
  slug: string;
  @Expose()
  status;
  @Expose()
  updatedAt: Date;
  @Expose()
  vendorId: number;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
