import { CartModel } from '@prisma/client';
import { Product } from '../../product/product.entity';
import { Cart } from '../cart.entity';

export class CartMapper {
  static MaptToDomain(cartModel: CartModel, products: Product[]): Cart {
    return new Cart({ ...cartModel, products });
  }
}
