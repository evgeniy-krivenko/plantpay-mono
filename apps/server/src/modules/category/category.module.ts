import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaModule } from '@plantpay-mono/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
