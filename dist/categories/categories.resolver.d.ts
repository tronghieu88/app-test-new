import { CategoriesService } from './categories.service';
import { Category, CategoryResult } from './entities/category.entities';
import { CategoryInput } from './dto/category.dto';
export declare class CategoriesResolver {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    testCategory(): string;
    createCategory(categoryInput: CategoryInput): Promise<Category>;
    getAllCategory(): Promise<CategoryResult>;
}
