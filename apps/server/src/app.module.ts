import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from '@plantpay-mono/prisma';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot(), ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
