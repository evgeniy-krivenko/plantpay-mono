import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService, ProductStatus } from '@plantpay-mono/prisma';
import { Prisma } from '@prisma/client';
import { Product } from '../product.entity';
import { ProductMapper } from './product.mapper';
import { productRepositoryException } from '@plantpay-mono/constants';

export type ProductWhereInput = Prisma.ProductModelWhereInput;

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const { id, name, description, price, slug, categoryId, images, vendorId } = product;
    try {
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
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException(productRepositoryException.UNIQUE_CONSTRAINT_VIOLATION, HttpStatus.BAD_REQUEST);
        }
      } else {
        throw e;
      }
    }
  }

  async *getAllPublishedProducts(
    limit = 20,
    offset = 0,
    wereInputs?: ProductWhereInput,
  ): AsyncIterableIterator<Product> {
    try {
      const productModels = await this.prismaService.productModel.findMany({
        take: limit,
        skip: offset,
        where: wereInputs,
        include: { images: true },
      });
      for (const productModel of productModels) {
        yield ProductMapper.mapToDomain(productModel);
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException(productRepositoryException.WRONG_PARAMS, HttpStatus.BAD_REQUEST);
        }
      } else {
        throw e;
      }
    }
  }

  async *getManyByIds(ids: string[]): AsyncIterableIterator<Product> {
    const productModels = await this.prismaService.productModel.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: { images: true, vendor: true },
    });
    for (const productModel of productModels) {
      yield ProductMapper.mapToDomain(productModel);
    }
  }

  async getManyByCartId(cartId: string): Promise<Product[] | null> {
    const productModels = await this.prismaService.productModel.findMany({
      where: {
        carts: {
          some: {
            cart: { id: cartId },
          },
        },
      },
      include: { images: true },
    });
    if (!productModels) {
      return null;
    }
    return productModels.map((p) => ProductMapper.mapToDomain(p));
  }
}
