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

type ProductImage = {
  url: string;
  alt?: string;
  type?: 'image' | 'video';
};

export type Product = {
  id: string;
  name: string;
  description: string;
  reference: string;
  brand: string;
  category: Category;
  colors: string[];
  sizes: string[];
  stock: number;
  price: Price;
  status: Status;
  rating: number;
  ean13: string;
  images: ProductImage[];
  createdAt: string;
  updateData: string;
  tags: Tag[];
  variations: Variation[];
};