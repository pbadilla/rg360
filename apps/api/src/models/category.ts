import mongoose, { Schema, Document } from 'mongoose';
import { category, subcategory } from '@/types/category';

export interface ICategory extends Document {
  id: string;           // your custom category identifier, e.g. "skates/accessories/custom-kits"
  name: string;         // display name
  slug: string;         // URL-friendly slug
  image?: string;       // optional image URL or path
  description?: string; // optional description text
  category?: category;
  subcategory?: subcategory;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema<ICategory>({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  image: { type: String, default: null },
  description: { type: String, default: null },
  category: { type: Object, default: null }, // Optional, can be used for main categories
  subcategory: { type: Object, default: null }, // Optional, can be used for subcategories
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Create model
export const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema, 'category');