export interface Price {
  pvp: number;
  pv: number;
  benefit_percentage: number;
}

// 1️⃣ Parsed CSV row
export interface CsvRow {
  idCode?: string;
  reference: string;
  description?: string;
  ean13: string;
  price?: Price;
  stock?: string | number;
  name: string;
  image?: string;
  brand: string;
  family: string;
  weight?: string;
  color?: string;
  size?: string;
  colorNombre?: string;
  colorBase?: string;
  colorCodigo?: string;
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
  price?: Price;
  image?: string;
}

// 3️⃣ Base product type
export interface BaseProduct {
  parentReference?: string;
  reference: string;
  ean13: string;
  brand: string;
  colors: string[];
  sizes: string[];
  price: Price;
  stock: number;
  image?: string;
}

// 4️⃣ Full Mongo document
export interface ProductDoc extends BaseProduct {
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
  'brand' | 'reference' | 'ean13' | 'colors' | 'sizes' | 'price' | 'stock'
>;


// 6️⃣ Grouped product before enrichment/DB
export interface GroupedProduct {
  skuRoot: string;        // the family or prefix (e.g. "ABR")
  reference: string;
  description?: string;
  ean13: string;
  name: string;           // base name without color/size
  brand: string;
  category?: string | undefined;     // CSV category or mapped category
  colors: string[];
  sizes: string[];
  price: Price;
  stock: number;
  variations: Variation[];
  images: string[];
}
