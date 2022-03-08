export type ProductImageSlug = string;
export type ProductImageId = string;

export class ProductImageEntity {
  constructor(
    private readonly _slug: ProductImageSlug,
    private readonly _isMain: boolean,
    private readonly _id?: ProductImageId,
  ) {}

  get id(): ProductImageId {
    return this._id !== undefined ? this._id : null;
  }

  get slug(): ProductImageSlug {
    return this._slug;
  }

  get isMain(): boolean {
    return this._isMain;
  }
}
