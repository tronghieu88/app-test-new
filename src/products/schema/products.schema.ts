import { Category } from 'src/categories/entities/category.entities';
import { Product } from '../entities/product.entities';
import { Schema, Model } from 'mongoose';

export type ProductModelType = Model<Product>;

export const ProductSchema = new Schema<Product>({
  //   _id: { type: String, unique: true },
  productId: { type: String, trim: true, required: true, unique: true },
  productName: { type: String, trim: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 1000 },
  urlImage: { type: [String], default: [], trim: true },
  discount: { type: Number },
  description: { type: String, trim: true },
  colors: { type: [String], trim: true },
  rating: { type: Number },
  createdAt: { type: Date, default: new Date() },
  isDeleted: { type: Boolean, default: false },
  updatedAt: { type: Date, default: new Date() },
  slug: { type: String, trim: true },
  keyword: { type: String, trim: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: Category.name,
    // foreignField: '_id',
    // localField: 'categoryId',
    autopopulate: { maxDepth: 1 },
  },
});
