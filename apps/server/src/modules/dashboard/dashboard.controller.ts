import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UserFromReq } from '../auth/decorators/user.decorator';
import { User } from '../auth/user.entity';
import { IProductForVendor } from '@plantpay-mono/types';
import { ProductForVendorDto } from './dto/product-for-vendor.dto';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  strategy: 'excludeAll',
})
@UsePipes(ValidationPipe)
@Roles('VENDOR')
@UseGuards(JwtAccessGuard, RoleGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/products')
  getProducts(@UserFromReq() user: User): Promise<IProductForVendor[]> {
    return this.dashboardService.getProducts(user.id);
  }

  @Post('/add-product')
  async createProduct(@Body() dto: CreateProductDto, @UserFromReq() user: User): Promise<IProductForVendor> {
    const product = await this.dashboardService.createProduct(dto, user);
    return new ProductForVendorDto({ ...product });
  }
}
