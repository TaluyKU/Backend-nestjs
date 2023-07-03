import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/models/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly CategoryModel: Model<Category>,
  ) {}

  async createCategory(category: Category) {
    const newCategory = await this.CategoryModel.create(category);
    console.log(`[CREATE] Category: ${newCategory}`);
    return newCategory;
  }

  async getAllCategory() {
    const allCategory = await this.CategoryModel.find().exec();
    console.log(`[GET] All Category: ${allCategory}`);
    return allCategory;
  }

  async findCategoryById(id: string) {
    const foundCategory = await this.CategoryModel.findById(id).exec();
    console.log(`[GET] Category By Id: ${foundCategory}`);
    return foundCategory;
  }

  async findCategoryByName(name: string) {
    const foundCategory = await this.CategoryModel.findOne({ name }).exec();
    console.log(`[GET] Category By Name: ${foundCategory}`);
    return foundCategory;
  }
}
