import { Injectable } from '@nestjs/common';
import { PrismaService } from '@plantpay-mono/prisma';
import { ProductRepository } from '../../product/repository/product.repository';
import { VendorRepository } from '../../vendor/repository/vendor.repository';
import { Cart } from '../cart.entity';
import { CartMapper } from './cart.mapper';

export type CartSearchParams = Record<'id', string> | Record<'userId', number>;

@Injectable()
export class CartRepository {
  constructor(private readonly prismaService: PrismaService, private readonly productRepository: ProductRepository) {}

  async getCart(cartSearchParams: CartSearchParams): Promise<Cart | null> {
    const cartModel = await this.prismaService.cartModel.findUnique({ where: cartSearchParams });
    if (!cartModel) {
      return null;
    }

    const products = (await this.productRepository.getManyByCartId(cartModel.id)) || [];
    return CartMapper.MaptToDomain(cartModel, products);
  }

  async createCart(cart: Cart): Promise<void> {
    await this.prismaService.cartModel.create({ data: { id: cart.id } });
  }
}
