import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  SerializeOptions,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IDataPagination, IProductForUsers } from '@plantpay-mono/types';
import { GetProductsQuery } from './dto/get-products-query';
import { ProductService } from './product.service';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  strategy: 'excludeAll',
})
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

  @Get()
  getAllForUsers(@Query() query: GetProductsQuery): Promise<IDataPagination<IProductForUsers>> {
    return this.productService.getAllForUsers(query);
  }
}
