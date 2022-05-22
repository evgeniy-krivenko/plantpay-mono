import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { IProductForUsers, IProductForVendor } from '@plantpay-mono/types';
import { UserFromReq } from '../auth/decorators/user.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { User } from '../auth/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsQuery } from './dto/get-products-query';
import { ProductService } from './product.service';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAccessGuard)
  @Post('/create')
  create(@Body() dto: CreateProductDto, @UserFromReq() user: User): Promise<IProductForVendor> {
    return this.productService.createProduct(dto, user);
  }

  @Get()
  getAllForUsers(@Query() queryParams: GetProductsQuery): Promise<IProductForUsers[]> {
    return this.productService.getAllForUsers(queryParams);
  }
}
