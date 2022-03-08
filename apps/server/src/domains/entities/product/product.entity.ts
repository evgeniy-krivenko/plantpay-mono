import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { v4 as uuidv4 } from 'uuid'

export type ProductId = string;

export const PRODUCT_ENTITY_STATUS = {
  DRAFT: 'DRAFT',
  MODERATE: 'MODERATE',
  PUBLISHED: 'PUBLISHED',
  ORDERED: 'ORDERED',
  SOLD: 'SOLD'
} as const;

export type PRODUCT_ENTITY_STATUS = keyof typeof PRODUCT_ENTITY_STATUS;

export class ProductEntity {
  private readonly _slug: string;
  private readonly _status: PRODUCT_ENTITY_STATUS

  constructor(
    private readonly _name: string,
    private readonly _image: string,
    private readonly _user,
    private readonly _id?: ProductId,
  ) {
    this._slug = ProductEntity.createSlug(_name);
    this._status = PRODUCT_ENTITY_STATUS.DRAFT
  }

  get slug(): string {
    return this._slug;
  }

  get id(): ProductId {
    return this._id !== undefined ? this._id : null;
  }

  get name(): string {
    return this._name;
  }

  get image(): string {
    return this._image;
  }

  get status(): PRODUCT_ENTITY_STATUS {
    return this._status;
  }

  static createSlug(name: string): string {
    const cyrillicToTranslit = new CyrillicToTranslit();
    const transiledName = cyrillicToTranslit.transform(name, '-');
    return transiledName + '--' + uuidv4();
  }
}

