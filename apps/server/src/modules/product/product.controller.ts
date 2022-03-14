import { Controller } from '@nestjs/common';

@Controller('product')
export class ProductController {
  create(): { message: string } {
    return { message: 'OK' };
  }
}
