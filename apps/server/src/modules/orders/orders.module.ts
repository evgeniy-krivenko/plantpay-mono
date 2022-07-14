import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { CartModule } from '../cart/cart.module';
import { OrdersService } from './orders.service';
import { AddressModule } from '../address/address.module';
import { PrismaModule } from '@plantpay-mono/prisma';

@Module({
  imports: [CartModule, AddressModule, PrismaModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
