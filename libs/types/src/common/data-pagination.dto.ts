import { IPagination } from '@plantpay-mono/types';
import { Expose } from 'class-transformer';

export class PaginationDto implements IPagination {
  @Expose()
  page: number;
  @Expose()
  perPage: number;
  @Expose()
  totalPages: number;

  constructor(pagination: Partial<PaginationDto>) {
    Object.assign(this, pagination);
  }
}
