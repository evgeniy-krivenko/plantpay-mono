import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { PrismaModule } from '@plantpay-mono/prisma';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
