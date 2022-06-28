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

  public mergeProductsIntoCart(products: Product[]): void {
    for (const product of products) {
      this.products.every((p) => p.id !== product.id) && this.products.push(product);
    }
  }

  public getVendorsWithProducts(productIdsForFilter?: string[]): Vendor[] {
    const filterProduct =
      (vendorId: number) =>
      (product: Product): boolean => {
        if (productIdsForFilter) {
          return product.vendorId === vendorId && productIdsForFilter.includes(product.id);
        }
        return product.vendorId === vendorId;
      };

    return this.vendors.filter((vendor) => {
      vendor.products = this.products.filter(filterProduct(vendor.id));
      return vendor.products.length > 0;
    });
  }
}
