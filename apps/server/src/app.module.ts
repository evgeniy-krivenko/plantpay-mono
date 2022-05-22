import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from '@plantpay-mono/prisma';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { FilesModule } from './modules/files/files.module';
import { CartModule } from './modules/cart/cart.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot(),
    ProductModule,
    FilesModule,
    CartModule,
    VendorModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
