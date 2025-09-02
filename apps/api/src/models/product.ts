import mongoose, { Schema, Document } from 'mongoose';

type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
type Status = 'active' | 'inactive' | 'discontinued';

interface Price {
  pvp: number;
  pv: number;
  benefit_percentage: number;
}

interface SizeVariation {
  size: Sizes;
  stock: number;
  price: Price;
  own_stock?: boolean;
}

interface Tag {
  name: string;
  color: string;
  type: 'offer' | 'category' | 'brand';
}

interface Category {
  name: string;
  color: string;
}

interface Variation {
  color: string;
  sizes: SizeVariation[];
}

export interface ProductDocument extends Document {
  brand?: string;
  category?: Category;
  description?: string;
  ean13: string;
  images: string[];
  name: string;
  price?: Price;
  rating: number;
  reference: string;
  status: Status;
  stock?: number;
  tags: Tag[];
  variations: Variation[];
  colors?: Variation[];
  vendorId?: string;
  updateData: Date | string;
  createdAt: Date | string;
}

// Esquemas anidados

const PriceSchema = new Schema(
  {
    pvp: { type: Number, required: true },
    pv: { type: Number, required: true },
    benefit_percentage: { type: Number, required: true },
  },
  { _id: false }
);

const SizeVariationSchema = new Schema(
  {
    size: {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      required: true,
    },
    stock: { type: Number, required: true },
    price: { type: PriceSchema, required: true },
    own_stock: { type: Boolean, default: false },
  },
  { _id: false }
);

const TagSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    type: {
      type: String,
      enum: ['offer', 'category', 'brand'],
      required: true,
    },
  },
  { _id: false }
);

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
  },
  { _id: false }
);

const VariationSchema = new Schema(
  {
    color: { type: String, required: true },
    sizes: { type: [SizeVariationSchema], required: true },
  },
  { _id: false }
);

// Esquema principal

export const ProductSchema = new Schema({
  brand: { type: String },
  category: { type: CategorySchema, required: false },
  colors: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  description: { type: String },
  ean13: { type: String, required: true },
  images: { type: [String], default: [] }, // URLs de imágenes
  name: { type: String, required: true },
  parentReference: { type: String },
  price: { type: PriceSchema },
  rating: { type: Number, default: 0, required: true },
  reference: { type: String, required: true },
  retailPrice: { type: PriceSchema },
  sizes: { type: [String], default: [] },
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued'],
    required: true,
  },
  stock: { type: Number, default: 0 },
  tags: { type: [TagSchema], default: [] },
  variations: { type: [VariationSchema], default: [] },
  updateData: { type: Date, default: Date.now },
  vendorId: { type: String },
});

// Para evitar el OverwriteModelError en hot-reload o tests
export const ProductModel =
  mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);
