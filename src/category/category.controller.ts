import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Category } from 'src/models/category.schema';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  createCategory(@Body() newCategory: Category) {
    return this.categoryService.createCategory(newCategory);
  }

  @Get('/all')
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @Get('/find/:id')
  findCategory(@Param('id') id: string) {
    return this.categoryService.findCategoryById(id);
  }
}
