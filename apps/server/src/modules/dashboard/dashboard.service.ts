import { Injectable } from '@nestjs/common';
import { ProductRepository, ProductWhereInput } from '../product/repository/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../auth/user.entity';
import { Product } from '../product/product.entity';
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

  async createProduct(
    { name, description, price, images, categoryId }: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const product = new Product({ name, description, price, categoryId, images, vendorId: user.id });
    return this.productRepository.create(product);
  }
}
