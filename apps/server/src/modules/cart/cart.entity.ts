import { v4 } from 'uuid';
import { User } from '../auth/user.entity';
import { Product } from '../product/product.entity';
import { Vendor } from '../vendor/vendor.entiry';

export class Cart {
  userId: number;
  products?: Product[];
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;

  constructor(partial: Partial<Cart>) {
    Object.assign(this, partial);
    if (!this.id) {
      this.id = v4();
    }
  }

  getVendorIds(): number[] {
    return this.products.map((product) => product.vendorId);
  }

  // TODO: covarage unit tests
  public mergeProductsIntoCart(products: Product[]): void {
    for (const product of products) {
      this.products.every((p) => p.id !== product.id) && this.products.push(product);
    }
  }
}

export class CartByVendors extends Cart {
  vendors: Vendor[];

  constructor(partial: Partial<Cart>, vendors: Vendor[]) {
    super(partial);
    this.vendors = this.sortProductByVendors(vendors);
    delete this.products;
  }

  private sortProductByVendors(vendors: Vendor[]): Vendor[] {
    vendors.map((vendor) => {
      vendor.products = this.products.filter((product) => product.vendorId === vendor.id);
      return vendor;
    });
    return vendors;
  }
}
