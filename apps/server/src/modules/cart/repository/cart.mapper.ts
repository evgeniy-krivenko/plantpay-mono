import { CartModel } from '@prisma/client';
import { Product } from '../../product/product.entity';
import { Vendor } from '../../vendor/vendor.entiry';
import { Cart } from '../cart.entity';

export class CartMapper {
  static MaptToDomain(cartModel: CartModel, products?: Product[], vendors?: Vendor[]): Cart {
    const { userId, createdAt, updatedAt, id } = cartModel;
    return new Cart(userId, createdAt, updatedAt, id, products, vendors);
  }
}
