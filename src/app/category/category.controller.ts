import { Body, Controller, Get, Param, Post, Logger } from '@nestjs/common';
import { Category } from 'src/models/category.schema';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private readonly logger = new Logger(CategoryController.name);

  @Post('/create')
  createCategory(@Body() newCategory: Category) {
    this.logger.log(`[POST] Category: ${newCategory}`);
    return this.categoryService.createCategory(newCategory);
  }

  @Get('/all')
  getAllCategory() {
    this.logger.log(`[GET] All Category`);
    return this.categoryService.getAllCategory();
  }

  @Get('/find/:id')
  findCategory(@Param('id') id: string) {
    this.logger.log(`[GET] Category By Id: ${id}`);
    return this.categoryService.findCategoryById(id);
  }

  @Get('/find/:name')
  findCategoryByName(@Param('name') name: string) {
    this.logger.log(`[GET] Category By Name: ${name}`);
    return this.categoryService.findCategoryByName(name);
  }
}
