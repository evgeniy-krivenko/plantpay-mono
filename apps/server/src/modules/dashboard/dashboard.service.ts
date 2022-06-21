import { Injectable } from '@nestjs/common';
import { ProductRepository, ProductWhereInput } from '../product/repository/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../auth/user.entity';
import { Product } from '../product/product.entity';
import { ProductForVendorDto } from './dto/product-for-vendor.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async getProducts(vendorId: number): Promise<ProductForVendorDto[]> {
    const whereInput: ProductWhereInput = { vendor: { id: vendorId } };
    const productIterator = this.productRepository.getAllPublishedProducts(30, 0, whereInput);
    const productForVendorItems: ProductForVendorDto[] = [];
    for await (const product of productIterator) {
      productForVendorItems.push(new ProductForVendorDto({ ...product }));
    }
    return productForVendorItems;
  }

  async createProduct({ name, description, price, images, categoryId }: CreateProductDto, user: User): Promise<Product> {
    const category = await this.categoryService.getCategoryById(categoryId);
    const product = new Product({ name, description, price, category, categoryId, images, vendorId: user.id });
    return this.productRepository.create(product);
  }
}
