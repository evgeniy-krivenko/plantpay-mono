import { Expose, Transform } from 'class-transformer';

export class ImageDto {
  @Expose()
  id: string;
  @Expose()
  isMain: boolean;
  @Expose()
  @Transform(({ value }: { value: string }) => {
    if (value.split('/').includes('static')) {
      return value;
    } else {
      return '/static/' + value;
    }
  })
  url: string;

  constructor(partial: Partial<ImageDto>) {
    Object.assign(this, partial);
  }
}
