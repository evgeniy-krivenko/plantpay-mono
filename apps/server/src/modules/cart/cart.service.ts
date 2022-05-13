import { Injectable } from '@nestjs/common';
import { VendorRepository } from '../vendor/repository/vendor.repository';
import { Cart, CartByVendors } from './cart.entity';
import { CartRepository } from './repository/cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository, private readonly vendorRepository: VendorRepository) {}

  async getOrCreateCart(userId: number | undefined, cartId: string | undefined): Promise<CartByVendors | Cart> {
    let userCart: Cart;
    let fromRequestCart: Cart;
    let resultCart: Cart;

    if (userId) {
      userCart = await this.cartRepository.getCart({ userId });
    }

    if (cartId) {
      fromRequestCart = await this.cartRepository.getCart({ id: cartId });
    }

    const isMergeCarts = !!userCart && !!fromRequestCart;
    const isCreateNewCart = !userCart && !fromRequestCart;

    if (isCreateNewCart) {
      const newCart = new Cart({});
      this.cartRepository.createCart(newCart);
      return newCart;
    }

    if (isMergeCarts) {
      userCart.mergeProductsIntoCart(fromRequestCart.products);
      const vendorIds = userCart.getVendorIds();
      const vendors = await this.vendorRepository.getVendorsByIds(vendorIds);
      const cardByVendors = new CartByVendors(userCart, vendors);
      return cardByVendors;
    }
    // мерджим корзину если надо
    // создаем новую, если нужно
    // дергаем всех вендоров и фильтруем по ним

    return resultCart;
  }
}
