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
  SKU?: string;
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

const ProductSchema = new Schema<ProductDocument>({
  SKU: String,
  brand: String,
  category: CategorySchema,
  description: String,
  ean13: { type: String, required: true },
  images: { type: [ProductImageSchema], default: [] },
  name: { type: String, required: true },
  price: PriceSchema,
  rating: { type: Number, required: true },
  reference: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive', 'discontinued'], required: true },
  stock: Number,
  tags: { type: [TagSchema], default: [] },
  variations: { type: [VariationSchema], default: [] },
  vendorId: { type: String, required: true },
  UpdateData: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const ProductModel = mongoose.model<ProductDocument>('products', ProductSchema);
