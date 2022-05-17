import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PLANTPAY_CART_ID } from '@plantpay-mono/constants';
import { InCart } from '@plantpay-mono/types';
import { Request, Response } from 'express';
import { getExpireDate } from '../../helps/get-expire-date';
import { Public } from '../auth/decorators/public.decorator';
import { UserFromReq } from '../auth/decorators/user.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { User } from '../auth/user.entity';
import { CartService } from './cart.service';
import { ProductIdDto } from './dto/add-product.dto';

@UseGuards(JwtAccessGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/')
  @Public()
  async getCart(
    @UserFromReq() user: User | undefined,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<InCart> {
    const cart = await this.cartService.getOrCreateCart(user?.id, req.cookies[PLANTPAY_CART_ID]);
    res.cookie('plantpayCart', cart.id, {
      expires: getExpireDate(30),
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
    return { inCart: cart.getProductIds(), cartId: cart.id };
  }

  @Public()
  @UsePipes(ValidationPipe)
  @Put('/:cartId')
  async addToCart(@Param('cartId') cartId: string, @Body() addProductDto: ProductIdDto): Promise<string[]> {
    const cart = await this.cartService.addToCart(cartId, addProductDto);
    return cart.getProductIds();
  }

  @Public()
  @Delete('/:cartId')
  async deleteFromCart(@Param('cartId') cartId: string, @Body() deleteProductDto: ProductIdDto): Promise<string[]> {
    const cart = await this.cartService.deleteFromCart(cartId, deleteProductDto);
    console.log(cart.getProductIds());
    return cart.getProductIds();
  }
}
