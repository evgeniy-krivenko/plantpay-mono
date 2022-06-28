import { ICreateOrders } from '@plantpay-mono/types';
import { ArrayMinSize, IsUUID } from 'class-validator';

export class CreateOrdersDto implements ICreateOrders {
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  checkedProductInCart: string[];
}
