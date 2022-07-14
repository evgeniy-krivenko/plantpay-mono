import {
  BadRequestException, Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { CartService } from '../cart/cart.service';
import { UserFromReq } from '../auth/decorators/user.decorator';
import { User } from '../auth/user.entity';
import { OrdersService } from './orders.service';
import { AddressService } from '../address/address.service';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';

@UseGuards(JwtAccessGuard)
@UsePipes(ValidationPipe)
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly cartService: CartService,
    private readonly addressService: AddressService,
    private readonly vendorOrderService: OrdersService,
  ) {}

  @Post('')
  async createOrders(@UserFromReq() user: User | undefined, @Body() dto: CreateOrdersDto): Promise<void> {
    const cart = await this.cartService.getCart({ userId: user.id });

    console.log(dto);
    if (!dto) {
      throw new InternalServerErrorException('Something wrong');
    }
    const { checkedProductInCart, addressId } = dto;

    if (!cart) {
      throw new BadRequestException(`Неверный ID корзины`);
    }

    const address = await this.addressService.getOne(addressId, user.id);

    if (!address) {
      throw new BadRequestException(`Неверный адрес`);
    }

    const productIdsFromCart = cart.getProductIds();

    for (const productId of checkedProductInCart) {
      if (!productIdsFromCart.includes(productId)) {
        throw new BadRequestException(`Товар с Id ${productId} не находится в вашей корзине`);
      }
    }

    const vendors = cart.getVendorsWithProducts(checkedProductInCart);
    await this.vendorOrderService.createOrder(user, vendors, addressId, cart.id);

    // const customerOrderId = await this.customerOrderService.createOrder(user, vendorOrderIds);
  }
}
