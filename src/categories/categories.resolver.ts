import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category, CategoryResult } from './entities/category.entities';
import { CategoryInput } from './dto/category.dto';

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => String)
  testCategory() {
    return 'Khong thay doi du lieu';
  }

  @Mutation(() => Category)
  async createCategory(
    @Args({ name: 'categoryInput', type: () => CategoryInput })
    categoryInput: CategoryInput,
  ): Promise<Category> {
    return await this.categoriesService.create(categoryInput);
  }

  @Query(() => CategoryResult)
  async getAllCategory(): Promise<CategoryResult> {
    return await this.categoriesService.getAllCategory();
  }
}
