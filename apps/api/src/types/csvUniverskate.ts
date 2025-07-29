export interface CsvRow {
  Reference: string;
  EAN: string;
  Price: string;
  Stock: string;
  Name: string;
  Image: string;
  Brand: string;
  Family: string;
  Weight: string;
}

export interface Variation {
  sku: string;
  ean: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  image: string;
}

export interface ProductDoc {
  parentReference?: string;
  reference: string;
  ean13: string;
  name: string;
  brand: string;
  weight: number;
  status: 'active' | 'draft';
  category: {
    code: string;
    name: string;
  };
  colors: string[];
  sizes: string[];
  variations: Variation[];
}