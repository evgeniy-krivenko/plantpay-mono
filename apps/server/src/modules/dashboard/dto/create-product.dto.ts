import { dto } from '@plantpay-mono/constants';
import { ArrayMaxSize, IsNumber, IsPositive, IsString, Length, ValidateNested } from 'class-validator';
import { ImageElementDto } from '../../files/dto/image-element.dto';
import { CreateProduct } from '@plantpay-mono/types';

export class CreateProductDto implements CreateProduct {
  @Length(3, 40, { message: dto.fieldLenMsg(3, 40) })
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  categoryId: number;
  @IsPositive({ message: dto.PRICE_POSITIVE })
  price: number;
  @ValidateNested()
  @ArrayMaxSize(5)
  images: ImageElementDto[];
}
