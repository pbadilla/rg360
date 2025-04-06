type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  brand: string;
  category: string;
  description: string;
  ean13: number;
  image: string;
  name: string;
  price: number;
  reference: string;
  sizes: Sizes[]
  stock: number;
}

export type SortKey = 'name' | 'price' | 'category' | 'stock';
export type SortOrder = 'asc' | 'desc';
export type ViewMode = 'grid' | 'table';

export interface SortConfig {
  key: SortKey;
  direction: SortOrder;
}
