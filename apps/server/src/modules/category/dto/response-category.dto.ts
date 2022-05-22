import { Expose, Transform } from 'class-transformer';
import path from 'path';
import { ICategory } from '@plantpay-mono/types';

/**
 * Class for serialize categories
 * for icon add 'static to path'
 * "Expose"
 */
export class ResponseCategoryDto implements ICategory {
  @Expose()
  readonly id: number;
  @Expose()
  readonly name: string;
  @Expose()
  @Transform(({ value }) => path.join('static', value))
  readonly icon: string;
  @Expose()
  readonly slug: string;

  constructor(partial: Partial<ResponseCategoryDto>) {
    Object.assign(this, partial);
  }
}
