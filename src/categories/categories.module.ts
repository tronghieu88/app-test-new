import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category } from './entities/category.entities';
import { CategorySchema } from './schema/categories.schema';
import { LoggerModule } from 'src/logger/logger.module';
import { createKeyword, createSlug } from 'src/utils/string.utils';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory: () => {
          const schema = CategorySchema;
          schema.pre('find', function () {
            this.find({ isDeleted: { $ne: true } });
          });
          schema.pre('save', function () {
            this.slug = createSlug(this.categoryName);
            this.keyword = createKeyword(this.slug);
          });
          return schema;
        },
      },
    ]),
    LoggerModule,
  ],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
