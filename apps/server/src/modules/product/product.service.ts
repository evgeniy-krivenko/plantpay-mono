import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IDataPagination, IPagination, IProductForUsers } from '@plantpay-mono/types';
import { ProductRepository, ProductWhereInput } from './repository/product.repository';
import { GetProductsQuery } from './dto/get-products-query';
import { ProductStatus } from '@prisma/client';
import { ProductForUsersDto } from './dto/product-for-users.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllForUsers({
    page: pageFormReq,
    per_page: perPageFromReq,
    category,
  }: GetProductsQuery): Promise<IDataPagination<IProductForUsers>> {
    const whereInput: ProductWhereInput = {
      status: ProductStatus.DRAFT,
      category: { slug: category },
    };

    const page = pageFormReq || 1;
    let perPage = perPageFromReq || 20;

    if (perPage > 100) {
      perPage = 100;
    }

    const skip = (page - 1) * perPage;
    const productCount = await this.productRepository.getProductCount(whereInput);
    const totalPages = Math.ceil(productCount / perPage);

    if (page > totalPages) {
      throw new HttpException('Такой страницы не существует', HttpStatus.BAD_REQUEST);
    }

    const productsGenerator = this.productRepository.getAllPublishedProducts(perPage, skip, whereInput);
    const productsForUser: IProductForUsers[] = [];
    for await (const product of productsGenerator) {
      productsForUser.push(new ProductForUsersDto({ ...product }));
    }
    const pagination: IPagination = { page, perPage, totalPages };
    return new ProductPaginationDto({ data: productsForUser, pagination });
  }
}
