import { Document } from 'mongoose';

// Define the types for the nested structures
export type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
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
  own_stock: boolean;
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

interface ProductImage {
  url: string;
  alt?: string;
  type?: 'image' | 'video';
}

// Now, the interface for Product
export default interface IProduct extends Document {
  SKU?: string;
  brand?: string;
  category?: Category;
  description?: string;
  ean13: string;
  images: ProductImage[];
  name: string;
  price?: Price;
  rating: number;
  reference: string;
  status: Status;
  stock?: number;
  tags: Tag[];
  variations: Variation[];
  vendorId: string;
  UpdateData: Date | string;
  createdAt: Date | string;
}
