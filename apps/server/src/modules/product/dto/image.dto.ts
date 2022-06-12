import { Expose } from 'class-transformer';

export class ImageDto {
  @Expose()
  id: string;
  @Expose()
  isMain: boolean;
  @Expose()
  url: string;
}
