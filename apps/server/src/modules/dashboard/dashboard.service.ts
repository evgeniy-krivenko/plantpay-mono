import { Injectable } from '@nestjs/common';
import { ProductRepository, ProductWhereInput } from '../product/repository/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../auth/user.entity';
import { Product } from '../product/product.entity';
import BigNumber from 'bignumber.js';
import { ProductForVendorDto } from './dto/product-for-vendor.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(vendorId: number): Promise<ProductForVendorDto[]> {
    const whereInput: ProductWhereInput = { vendor: { id: vendorId } };
    const productIterator = this.productRepository.getAllPublishedProducts(30, 0, whereInput);
    const productForVendorItems: ProductForVendorDto[] = [];
    for await (const product of productIterator) {
      productForVendorItems.push(new ProductForVendorDto({ ...product }));
    }
    return productForVendorItems;
  }

  async createProduct(dto: CreateProductDto, user: User): Promise<Product> {
    const decimalPrice = new BigNumber(dto.price);
    const product = new Product(dto.name, dto.description, user.id, dto.categoryId, decimalPrice, dto.images);
    product.createSlug();
    return this.productRepository.create(product);
  }
}
