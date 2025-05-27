import mongoose, { Schema, Document } from 'mongoose';

export type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
type Status = 'active' | 'inactive' | 'discontinued';

const PriceSchema = new Schema({
  pvp: { type: Number, required: true },
  pv: { type: Number, required: true },
  benefit_percentage: { type: Number, required: true },
}, { _id: false });

const SizeVariationSchema = new Schema({
  size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], required: true },
  stock: { type: Number, required: true },
  price: { type: PriceSchema, required: true },
  own_stock: { type: Boolean, default: false },
}, { _id: false });

const TagSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  type: { type: String, enum: ['offer', 'category', 'brand'], required: true },
}, { _id: false });

const CategorySchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
}, { _id: false });

const VariationSchema = new Schema({
  color: { type: String, required: true },
  sizes: { type: [SizeVariationSchema], required: true },
}, { _id: false });

const ProductImageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
}, { _id: false });

export interface ProductDocument extends Document {
  brand?: string;
  category?: {
    name: string;
    color: string;
  };
  description?: string;
  ean13: string;
  images: typeof ProductImageSchema[];
  name: string;
  price?: {
    pvp: number;
    pv: number;
    benefit_percentage: number;
  };
  rating: number;
  reference: string;
  status: Status;
  stock?: number;
  tags: typeof TagSchema[];
  variations: typeof VariationSchema[];
  vendorId: string;
  UpdateData: Date | string;
  createdAt: Date | string;
}

const ProductSchema = new Schema({
  brand: String,
  category: { type: Schema.Types.Mixed }, // if CategorySchema is not defined
  colors: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  description: String,
  ean13: { type: String, required: true },
  images: { type: [String], default: [] }, // Assuming images are just URLs
  name: { type: String, required: true },
  parentReference: { type: String },
  price: PriceSchema,
  rating: { type: Number, default: 0, required: true },
  reference: { type: String, required: true },
  retailPrice: PriceSchema,
  sizes: { type: [String], default: [] },
  status: { type: String, enum: ['active', 'inactive', 'discontinued'], required: true },
  stock: { type: Number, default: 0 },
  tags: { type: [Schema.Types.Mixed], default: [] },
  variations: { type: [Schema.Types.Mixed], default: [] },
  updateData: { type: Date, default: Date.now },
});

export const ProductModel = mongoose.model<ProductDocument>('products', ProductSchema);
