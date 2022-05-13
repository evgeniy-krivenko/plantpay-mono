import BigNumber from 'bignumber.js';
import { v4 as uuid } from 'uuid';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { ImageElementDto } from '../files/dto/image-element.dto';
import { ProductStatus } from '@prisma/client';
import { User } from '../auth/user.entity';

export class Product {
  constructor(
    private readonly _name: string,
    private readonly _description: string,
    private readonly _vendorId: number,
    private _categoryId: number,
    private _price: BigNumber,
    private readonly _images: ImageElementDto[],
    private readonly _id?: string,
    private _status?: ProductStatus,
    private _slug?: string,
    private readonly _createdAt?: Date,
    private readonly _updatedAt?: Date,
    private readonly _vendor?: User,
  ) {
    if (!_id) {
      this._id = uuid();
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get vendorId(): number {
    return this._vendorId;
  }

  get price(): BigNumber {
    return this._price;
  }

  get slug(): string {
    return this._slug;
  }

  get categoryId(): number {
    return this._categoryId;
  }

  get images(): ImageElementDto[] {
    return this._images;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get status(): ProductStatus {
    return this._status;
  }

  get vendor(): User | undefined {
    return this._vendor;
  }

  public createSlug(): void {
    const cyrillicToTranslit = new CyrillicToTranslit();
    const transiledName = cyrillicToTranslit.transform(this.name, '-');
    this._slug = transiledName + '--' + this.id;
  }
}
