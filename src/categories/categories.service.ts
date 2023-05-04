import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category, CategoryResult } from './entities/category.entities';
import { LoggerService } from 'src/logger/logger.service';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryInput } from './dto/category.dto';
import { throwIfExisted } from 'src/utils/model.utils';

type CategoryModelType = Model<Category>;

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: CategoryModelType,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext('CategoryService');
  }

  async create(categoryInput: CategoryInput): Promise<Category> {
    // const categoryExist = await this.categoryModel.findOne({
    //   categoryId: categoryInput.categoryId,
    // });
    // throwIfExisted(categoryExist, 'Loại sản phẩm đã tồn tại!');
    return await this.categoryModel.create(categoryInput);
  }

  async getAllCategory(): Promise<CategoryResult> {
    const results = await this.categoryModel.find();
    const totalCount = results.length;
    return { results, totalCount };
  }
}
