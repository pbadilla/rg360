// Generalized parsed CSV row
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

// Alias per source (optional)
export type CsvRowRollerblade = CsvRow;
export type CsvRowUniverskate = CsvRow;

// Variation object inserted into Mongo
export interface Variation {
  sku: string;
  ean: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  image?: string;
}

// Final Mongo document
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
  images?: string[];
}
