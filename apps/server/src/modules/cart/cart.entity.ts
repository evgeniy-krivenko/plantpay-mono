import { v4 } from 'uuid';
import { Product } from '../product/product.entity';
import { Vendor } from '../vendor/vendor.entiry';

export class Cart {
  constructor(
    public readonly userId?: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly id: string = v4(),
    public products: Product[] = [],
    public vendors: Vendor[] = [],
  ) {}

  getVendorIds(): number[] {
    return this.products.map((product) => product.vendorId);
  }

  getProductIds(): string[] {
    return this.products.map((product) => product.id);
  }

  // TODO: covarage unit tests
  public mergeProductsIntoCart(products: Product[]): void {
    for (const product of products) {
      this.products.every((p) => p.id !== product.id) && this.products.push(product);
    }
  }

  public getProductsByVendors(): Vendor[] {
    return this.vendors.map((vendor) => {
      vendor.products = this.products.filter((product) => product.vendorId === vendor.id);
      return vendor;
    });
  }
}
