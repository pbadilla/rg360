// Unified types for CSV, products, variations, and AI description

// 1️⃣ Parsed CSV row
export interface CsvRow {
  idCode?: string;
  Reference: string;
  EAN: string;
  Price?: string;
  Stock?: string;
  Name: string;
  Image?: string;
  Brand: string;
  Family: string;
  Weight?: string;
  Color?: string;
  Size?: string;
  ColorNombre?: string;
  ColorBase?: string;
  ColorCodigo?: string;
}

// Aliases per source (optional)
export type CsvRowRollerblade = CsvRow;
export type CsvRowUniverskate = CsvRow;

// 2️⃣ Variation object inserted into Mongo
export interface Variation {
  sku: string;
  ean: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  image?: string;
}

// 3️⃣ Base product type
export interface BaseProduct {
  parentReference?: string;
  reference: string;
  ean: string;
  brand: string;
  colors: string[];
  sizes: string[];
  price: number;
  stock: number;
  image?: string;
}

// 4️⃣ Full Mongo document
export interface ProductDoc extends BaseProduct {
  ean13: string;
  name: string;
  description: string;
  weight: number;
  status: 'active' | 'draft';
  category: {
    code: string;
    name: string;
  };
  variations: Variation[];
  images?: string[];
}

// 5️⃣ Type used for AI description generation
export type ProductForDescription = Pick<
  BaseProduct,
  'brand' | 'reference' | 'ean' | 'colors' | 'sizes' | 'price' | 'stock'
>;
