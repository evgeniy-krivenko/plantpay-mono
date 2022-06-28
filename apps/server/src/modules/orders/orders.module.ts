import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { CartModule } from '../cart/cart.module';
import { CustomerOrderService } from './customer-order.service';
import { VendorOrderService } from './vendor-order.service';

@Module({
  imports: [CartModule],
  controllers: [OrdersController],
  providers: [CustomerOrderService, VendorOrderService],
})
export class OrdersModule {}
