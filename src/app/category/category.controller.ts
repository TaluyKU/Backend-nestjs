import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Category } from 'src/models/category.schema';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  createCategory(@Body() newCategory: Category) {
    console.log(`[POST] Category: ${newCategory}`);
    return this.categoryService.createCategory(newCategory);
  }

  @Get('/all')
  getAllCategory() {
    console.log(`[GET] All Category`);
    return this.categoryService.getAllCategory();
  }

  @Get('/find/:id')
  findCategory(@Param('id') id: string) {
    console.log(`[GET] Category By Id: ${id}`);
    return this.categoryService.findCategoryById(id);
  }

  @Get('/find/:name')
  findCategoryByName(@Param('name') name: string) {
    console.log(`[GET] Category By Name: ${name}`);
    return this.categoryService.findCategoryByName(name);
  }
}
