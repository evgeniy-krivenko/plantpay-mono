import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../auth/decorators/public.decorator';
import { UserFromReq } from '../auth/decorators/user.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { User } from '../auth/user.entity';
import { CartService } from './cart.service';

@UseGuards(JwtAccessGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('')
  @Public()
  async getCart(@UserFromReq() user: User | undefined, @Req() req: Request): Promise<any> {
    // проверить куки на айди корзиры
    // если куки найден, дернуть корзину из базы
    // проверить пользователя, если найден, дернуть корзину из базы
    // если найдены обе корзины, то надо их смержить,
    // и записать айди корзины из базы в куки,
    // const requestCartId = req.cookies['plantpay-cartId'] as string | undefined;
    // const cart = await this.cartService.getOrCreateCart(user?.id, requestCartId);
    // нужно вернуть массив айдишников продуктов, чтобы определить, в корзине они или нет на фронте
  }
}
