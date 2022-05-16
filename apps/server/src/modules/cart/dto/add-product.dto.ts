import { IsUUID } from 'class-validator';

export class ProductIdDto {
  @IsUUID('4')
  productId: string;
}
