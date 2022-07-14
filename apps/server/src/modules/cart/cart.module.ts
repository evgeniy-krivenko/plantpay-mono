import { Module } from '@nestjs/common';
import { PrismaModule } from '@plantpay-mono/prisma';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { VendorModule } from '../vendor/vendor.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './repository/cart.repository';

@Module({
  imports: [AuthModule, ProductModule, PrismaModule, VendorModule],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService],
})
export class CartModule {}
