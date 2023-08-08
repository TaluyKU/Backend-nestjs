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
    return newCategory;
  }

  async getAllCategory() {
    const allCategory = await this.CategoryModel.find().exec();
    const categoryList = allCategory.map((category) => category.name);
    return categoryList;
  }

  async findCategoryById(id: string) {
    const foundCategory = await this.CategoryModel.findById(id).exec();
    return foundCategory;
  }

  async findCategoryByName(name: string) {
    const foundCategory = await this.CategoryModel.findOne({ name }).exec();
    return foundCategory;
  }
}
