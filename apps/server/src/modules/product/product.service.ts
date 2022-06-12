import { Injectable } from '@nestjs/common';
import { IProductForUsers } from '@plantpay-mono/types';
import { ProductRepository, ProductWhereInput } from './repository/product.repository';
import { GetProductsQuery } from './dto/get-products-query';
import { ProductStatus } from '@prisma/client';
import { ProductForUsersDto } from './dto/product-for-users.dto';

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
      productsForUser.push(new ProductForUsersDto({ ...product }));
    }
    return productsForUser;
  }
}
