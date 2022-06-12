import { Injectable } from '@nestjs/common';
import { IProductForUsers } from '@plantpay-mono/types';
import { ProductRepository, ProductWhereInput } from './repository/product.repository';
import { GetProductsQuery } from './dto/get-products-query';
import { ProductStatus } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllForUsers({ limit, offset, category }: GetProductsQuery): Promise<IProductForUsers[]> {
    const whereInput: ProductWhereInput = { status: ProductStatus.DRAFT };
    if (category) {
      whereInput.category = { slug: category };
    }
    const productsGenerator = this.productRepository.getAllPublishedProducts(limit, offset, whereInput);
    const productsForUser: IProductForUsers[] = [];
    for await (const product of productsGenerator) {
      const { id, name, description, images, categoryId, slug, price } = product;
      // TODO: сделать выборку по isMain
      const [image] = images;
      image.url = '/static/' + image.url;
      productsForUser.push({ id, name, description, image, categoryId, slug, price });
    }
    return productsForUser;
  }
}
