import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetProductsQuery {
  @IsInt()
  @Type(() => Number)
  limit?: number;
  @IsInt()
  @Type(() => Number)
  offset?: number;
}
