import { Model } from 'mongoose';
import { Category, CategoryResult } from './entities/category.entities';
import { LoggerService } from 'src/logger/logger.service';
import { CategoryInput } from './dto/category.dto';
type CategoryModelType = Model<Category>;
export declare class CategoriesService {
    private categoryModel;
    private loggerService;
    constructor(categoryModel: CategoryModelType, loggerService: LoggerService);
    create(categoryInput: CategoryInput): Promise<Category>;
    getAllCategory(): Promise<CategoryResult>;
}
export {};
