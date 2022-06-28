import { BadRequestException, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { CartService } from '../cart/cart.service';
import { UserFromReq } from '../auth/decorators/user.decorator';
import { User } from '../auth/user.entity';
import { VendorOrderService } from './vendor-order.service';
import { CustomerOrderService } from './customer-order.service';

@UsePipes(ValidationPipe)
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly cartService: CartService,
    private readonly vendorOrderService: VendorOrderService,
    private readonly customerOrderService: CustomerOrderService,
  ) {}

  @Post('')
  async createOrders(@UserFromReq() user: User | undefined, { checkedProductInCart }: CreateOrdersDto): Promise<void> {
    const cart = await this.cartService.getCart({ userId: user.id });

    if (!cart) {
      throw new BadRequestException(`Неверный ID корзины`);
    }

    const productIdsFromCart = cart.getProductIds();

    for (const productId of checkedProductInCart) {
      if (!productIdsFromCart.includes(productId)) {
        throw new BadRequestException(`Товар с Id ${productId} не находится в вашей корзине`);
      }
    }

    const vendors = cart.getVendorsWithProducts(checkedProductInCart);

    const vendorOrderIds: string[] = [];

    for (const vendor of vendors) {
      const vendorOrderId = await this.vendorOrderService.createOrder(vendor);
      vendorOrderIds.push(vendorOrderId);
    }

    // const customerOrderId = await this.customerOrderService.createOrder(user, vendorOrderIds);
  }
}
