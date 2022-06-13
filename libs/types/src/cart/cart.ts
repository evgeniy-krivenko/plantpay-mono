import { IProductForUsers } from '../product/product-for-users.interface';

export interface InCart {
  cartId: string;
  inCart: string[];
}

export interface IVendorWithProduct {
  name: string;
  email: string;
  products: IProductForUsers[];
}
