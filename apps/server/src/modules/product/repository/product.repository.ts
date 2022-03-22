import { Injectable } from '@nestjs/common';
import { PrismaService, ProductStatus } from '@plantpay-mono/prisma';
import { Product } from '../product.entity';
import { ProductMapper } from './product.mapper';

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const { id, name, description, price, slug, categoryId, images, vendorId } = product;
    const productModel = await this.prismaService.productModel.create({
      data: {
        id,
        name,
        description,
        price: price.toFixed(2),
        slug,
        category: {
          connect: { id: categoryId },
        },
        vendor: {
          connect: { id: vendorId },
        },
        images: {
          createMany: { data: images },
        },
      },
      include: { images: true },
    });
    return ProductMapper.mapToDomain(productModel);
  }

  async *getAllPublishedProducts(limit = 0, offset = 0): AsyncIterableIterator<Product> {
    const productModels = await this.prismaService.productModel.findMany({
      take: limit,
      skip: offset,
      where: { status: ProductStatus.DRAFT },
      include: { images: true },
    });
    for (const productModel of productModels) {
      yield ProductMapper.mapToDomain(productModel);
    }
  }
}