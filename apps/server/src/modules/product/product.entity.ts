import BigNumber from 'bignumber.js';
import { v4 as uuid } from 'uuid';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { ImageElementDto } from '../files/dto/image-element.dto';
import { ProductStatus } from '@prisma/client';
import { User } from '../auth/user.entity';

export class Product {
  constructor(
    readonly description: string,
    readonly name: string,
    readonly vendorId: number,
    public categoryId: number,
    public price: BigNumber,
    readonly images: ImageElementDto[],
    readonly id?: string,
    public status?: ProductStatus,
    public slug?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
    readonly vendor?: User,
  ) {
    if (!id) {
      this.id = uuid();
    }
  }

  public createSlug(): void {
    const cyrillicToTranslit = new CyrillicToTranslit();
    const transiledName = cyrillicToTranslit.transform(this.name, '-');
    this.slug = transiledName + '--' + this.id;
  }
}
