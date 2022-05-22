import { ClassSerializerInterceptor, Controller, Get, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { ICategory } from '@plantpay-mono/types';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @SerializeOptions({
    strategy: 'excludeAll',
  })
  @Get('')
  async getAll(): Promise<ICategory[]> {
    const categoryModels = await this.categoryService.getAll();
    return categoryModels.map((category) => {
      return new ResponseCategoryDto({ ...category });
    });
  }
}
