import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { cartException } from '@plantpay-mono/constants';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Cart } from './cart.entity';
import { ProductIdDto } from './dto/add-product.dto';
import { CartRepository, CartSearchParams } from './repository/cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async getCart(cartSearchParams: CartSearchParams): Promise<Cart> {
    return this.cartRepository.getCart(cartSearchParams);
  }

  async getOrCreateCart(userId: number | undefined, cartId: string | undefined): Promise<Cart> {
    let userCart: Cart;
    let fromRequestCart: Cart;

    if (userId) {
      userCart = await this.cartRepository.getCart({ userId });
    }

    if (cartId) {
      fromRequestCart = await this.cartRepository.getCart({ id: cartId });
    }

    const isMergeCarts = !!userCart && !!fromRequestCart;
    const isCreateNewCart = !userCart && !fromRequestCart;
    const isAnonymous = fromRequestCart && !userCart;

    if (isAnonymous) {
      return fromRequestCart;
    }

    if (isCreateNewCart) {
      const newCart = await this.cartRepository.createCart(new Cart());
      return newCart;
    }

    if (isMergeCarts) {
      userCart.mergeProductsIntoCart(fromRequestCart.products);
    }

    return userCart;
  }

  async addToCart(cartId: string, { productId }: ProductIdDto): Promise<Cart> {
    try {
      await this.cartRepository.addProduct(cartId, productId);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003') {
        throw new HttpException(cartException.CART_OR_PRODUCT_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }
    }

    const cart = await this.cartRepository.getCart({ id: cartId });
    if (!cart) {
      throw new HttpException(cartException.CART_OR_PRODUCT_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    console.log(cartId, productId);
    return cart;
  }

  async deleteFromCart(cartId: string, { productId }: ProductIdDto): Promise<Cart> {
    try {
      await this.cartRepository.deleteProduct(cartId, productId);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003') {
        throw new HttpException(cartException.CART_OR_PRODUCT_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }
    }

    const cart = await this.cartRepository.getCart({ id: cartId });
    if (!cart) {
      throw new HttpException(cartException.CART_OR_PRODUCT_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    return cart;
  }
}
