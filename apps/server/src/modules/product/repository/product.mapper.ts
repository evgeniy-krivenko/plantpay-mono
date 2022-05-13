import { ImageModel, ProductModel } from '@prisma/client';
import BigNumber from 'bignumber.js';
import { Product } from '../product.entity';

export interface ProductWithExtra extends ProductModel {
  images?: ImageModel[];
}

export class ProductMapper {
  public static mapToDomain(productModel: ProductWithExtra): Product {
    const { id, name, description, vendorId, categoryId, price, slug, status, createdAt, updatedAt, images } =
      productModel;
    return new Product(
      name,
      description,
      vendorId,
      categoryId,
      new BigNumber(price.toNumber()),
      images,
      id,
      status,
      slug,
      createdAt,
      updatedAt,
    );
  }
}
