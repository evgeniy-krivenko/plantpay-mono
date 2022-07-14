import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@plantpay-mono/prisma';
import { v4 } from 'uuid';
import { User } from '../auth/user.entity';
import { Vendor } from '../vendor/vendor.entiry';
import { ProductStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(user: User, vendors: Vendor[], addressId: string, cartId: string): Promise<void> {
    const userOrderId = v4();
    const createUserOrder = this.prismaService.userOrderModel.create({
      data: { id: userOrderId, addressId, userId: user.id },
    });

    const createVendorOrdersArray = [];
    const createOrderItemsArray = [];

    for (const vendor of vendors) {
      const vendorOrderId = v4();

      const createVendorOrder = this.prismaService.vendorOrderModel.create({
        data: { id: vendorOrderId, userOrderId, userId: vendor.id, addressId },
      });

      createVendorOrdersArray.push(createVendorOrder);

      for (const product of vendor.products) {
        if (product.status !== ProductStatus.DRAFT) {
          throw new BadRequestException('Один или несколько товаров не доступны для заказа');
        }

        createOrderItemsArray.push(
          this.prismaService.orderItemModel.create({
            data: { id: v4(), vendorOrderId, productId: product.id, price: Number(product.price) },
          }),
          this.prismaService.productModel.update({
            where: { id: product.id },
            data: { status: ProductStatus.ORDERED },
          }),
        );
      }
    }

    const clearCart = this.prismaService.cartOnProduct.deleteMany({
      where: { cartId },
    });

    const transactionResult = await this.prismaService.$transaction([
      createUserOrder,
      ...createVendorOrdersArray,
      ...createOrderItemsArray,
      clearCart,
    ]);

    console.log(transactionResult);

    return;
  }
}
