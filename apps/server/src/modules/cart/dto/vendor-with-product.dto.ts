import { Expose, Type } from 'class-transformer';
import { Vendor } from '../../vendor/vendor.entiry';
import { ProductForUsersDto } from '../../product/dto/product-for-users.dto';
import { IProductForUsers, IVendorWithProduct } from '@plantpay-mono/types';

export class VendorWithProductDto implements IVendorWithProduct {
  @Expose()
  readonly name: string;
  @Expose()
  readonly email: string;
  @Expose()
  @Type(() => ProductForUsersDto)
  readonly products: IProductForUsers[];

  constructor(partial: Partial<Vendor>) {
    Object.assign(this, partial);
  }
}
