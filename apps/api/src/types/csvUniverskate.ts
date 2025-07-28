/** Row exactly as it comes from csv-parser */
export interface CsvRow {
  Reference: string;       // ABR‑SH‑BK‑2‑4
  EAN: string;             // 4891844734017
  Price: string;           // "2.5"
  Stock: string;           // "0"
  Name: string;            // "ABRASIVE PAD SLIDER HIGH MODEL Black 34‑37"
  Image: string;           // https://…
  Brand: string;           // SEBA
  Family: string;          // ABR‑SH   (acts like a category code)
  Weight: string;          // 4.5
}

/** One offer/variant of the product */
export interface Variation {
  sku: string;             // row.Reference
  ean: string;             // row.EAN
  size: string;            // “34‑37”
  color: string;           // “Negro”
  stock: number;
  price: number;
  image: string;
}

/** What you will push into Mongo */
export interface ProductDoc {
  skuRoot: string;                // ABR‑SH
  name: string;                   // “Abrasive Pad Slider High Model”
  brand: string;                  // SEBA
  weight: number;
  category: { code: string; name: string };
  variations: Variation[];
}
