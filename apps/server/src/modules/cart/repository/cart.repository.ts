import { Injectable } from '@nestjs/common';
import { PrismaService } from '@plantpay-mono/prisma';
import { ProductRepository } from '../../product/repository/product.repository';
import { VendorRepository } from '../../vendor/repository/vendor.repository';
import { Cart } from '../cart.entity';
import { CartMapper } from './cart.mapper';

export type CartSearchParams = Record<'id', string> | Record<'userId', number>;

@Injectable()
export class CartRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productRepository: ProductRepository,
    private readonly vendorRepository: VendorRepository,
  ) {}

  async getCart(cartSearchParams: CartSearchParams): Promise<Cart | null> {
    const cartModel = await this.prismaService.cartModel.findUnique({ where: cartSearchParams });
    if (!cartModel) {
      return null;
    }

    const products = await this.productRepository.getManyByCartId(cartModel.id);
    const vendorIds = products.map((product) => product.vendorId);
    const vendors = await this.vendorRepository.getVendorsByIds(vendorIds);
    return CartMapper.MaptToDomain(cartModel, products, vendors);
  }

  async createCart(cart: Cart): Promise<Cart> {
    const cartModel = await this.prismaService.cartModel.create({ data: { id: cart.id } });
    return CartMapper.MaptToDomain(cartModel);
  }

  async addProduct(cartId: string, productId: string): Promise<void> {
    await this.prismaService.cartOnProduct.create({ data: { cartId, productId } });
  }

  async deleteProduct(cartId: string, productId: string): Promise<void> {
    await this.prismaService.cartOnProduct.delete({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });
  }
}
