import { Module } from '@nestjs/common';
import { PrismaModule } from '@plantpay-mono/prisma';
import { VendorRepository } from './repository/vendor.repository';

@Module({
  imports: [PrismaModule],
  providers: [VendorRepository],
  exports: [VendorRepository],
})
export class VendorModule {}
