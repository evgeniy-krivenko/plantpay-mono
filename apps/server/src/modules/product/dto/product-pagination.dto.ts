import { IDataPagination, IPagination } from '@plantpay-mono/types';
import { Expose, Type } from 'class-transformer';
import { ProductForUsersDto } from './product-for-users.dto';
import { PaginationDto } from '../../../../../../libs/types/src/common/data-pagination.dto';

export class ProductPaginationDto implements IDataPagination<ProductForUsersDto> {
  @Expose()
  @Type(() => ProductForUsersDto)
  data: ProductForUsersDto[];
  @Expose()
  @Type(() => PaginationDto)
  pagination: PaginationDto;

  constructor(partial: ProductPaginationDto) {
    Object.assign(this, partial);
  }
}
