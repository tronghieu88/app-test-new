import { Model, Schema } from 'mongoose';
import { Category } from '../entities/category.entities';

export type CategoryModelType = Model<Category>;

export const CategorySchema = new Schema<Category>({
  categoryId: { type: String, trim: true, required: true },
  categoryName: { type: String, trim: true },
  description: { type: String, trim: true },
  createdAt: { type: Date, default: new Date() },
  isDeleted: { type: Boolean, default: false },
  updatedAt: { type: Date, default: new Date() },
  slug: { type: String, trim: true },
  keyword: { type: String, trim: true },
});
