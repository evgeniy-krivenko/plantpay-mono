import { Type } from 'class-transformer';

export class GetProductsQuery {
  @Type(() => Number)
  page?: number | undefined;
  @Type(() => Number)
  per_page?: number | undefined;
  category?: string | undefined;
}
