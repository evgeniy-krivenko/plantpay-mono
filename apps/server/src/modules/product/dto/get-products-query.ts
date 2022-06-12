import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetProductsQuery {
  @Type(() => Number)
  limit?: number;
  @Type(() => Number)
  offset?: number;
  category?: string;
}
