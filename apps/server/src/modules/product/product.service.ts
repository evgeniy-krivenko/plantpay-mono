import { Injectable } from '@nestjs/common';
import { IProductForUsers, IProductForVendor } from '@plantpay-mono/types';
import BigNumber from 'bignumber.js';
import { User } from '../auth/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(dto: CreateProductDto, user: User): Promise<IProductForVendor> {
    const decimalPrice = new BigNumber(dto.price);
    const product = new Product(dto.name, dto.desctiprion, dto.categoryId, user.id, decimalPrice, dto.images);
    product.createSlug();
    const { id, name, description, images, price, categoryId, slug, vendorId, createdAt, updatedAt, status } =
      await this.productRepository.create(product);
    return {
      id,
      name,
      description,
      images,
      price,
      categoryId,
      slug,
      vendorId,
      createdAt,
      updatedAt,
      status,
    };
  }

  async getAllForUsers(limit = 20, offset = 0): Promise<IProductForUsers[]> {
    const productsGenerator = this.productRepository.getAllPublishedProducts(limit, offset);
    const productsForUser: IProductForUsers[] = [];
    for await (const product of productsGenerator) {
      const { id, name, description, images, categoryId, slug, price } = product;
      // TODO: сделать выборку по isMain
      const [image, ...otherImages] = images;
      image.url = '/static/' + image.url;
      productsForUser.push({ id, name, description, image, categoryId, slug, price });
    }
    return productsForUser;
  }
}
