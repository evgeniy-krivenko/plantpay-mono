import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryModel } from '@prisma/client';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  getAll(): Promise<CategoryModel[]> {
    return this.categoryService.getAll();
  }
}
