import { Injectable } from '@nestjs/common';
import { PrismaService } from '@plantpay-mono/prisma';
import { CategoryModel } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<CategoryModel[]> {
    return this.prismaService.categoryModel.findMany({});
  }

  async getCategoryById(id: number): Promise<CategoryModel> {
    return this.prismaService.categoryModel.findUnique({ where: { id } });
  }
}
