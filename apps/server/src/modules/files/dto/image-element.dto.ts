import { dto } from '@plantpay-mono/constants';
import { IImageElement } from '@plantpay-mono/types';
import { IsString, IsUUID } from 'class-validator';

export class ImageElementDto implements IImageElement {
  @IsUUID('4', { message: dto.WRONG_ID_FORMAT })
  id: string;
  @IsString()
  url: string;
  isMain: boolean;
}
