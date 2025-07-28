import { ProductModel } from '@/models/product';
import { extractColor, extractCSizes } from '@/utils/parserUniverskate';
import { CsvRow, Variation, ProductDoc } from '@/types/csvUniverskate';

export async function processUniverskateProduct(row: CsvRow): Promise<void> {
  const sku = row.Reference;
  const skuRoot = row.Family;
  const productReference = `US-${sku}`;
  const ean = row.EAN;
  const stock = parseInt(row.Stock || '0', 10);
  const price = parseFloat(row.Price || '0');
  const image = row.Image;
  const brand = row.Brand;
  const name = row.Name;
  const weight = parseFloat(row.Weight || '0');

  const color = extractColor(sku) || '';
  const sizes = extractCSizes(sku) || [];

  if (!ean || isNaN(price) || isNaN(stock)) {
    console.warn(`Skipping ${productReference}: invalid data (price, stock or EAN)`);
    return;
  }

  const variation: Variation = {
    sku,
    ean,
    size: sizes[0] || '',   // fallback if multiple sizes?
    color,
    stock,
    price,
    image,
  };

  const productData: ProductDoc = {
    skuRoot,
    name,
    brand,
    weight,
    category: {
      code: skuRoot,
      name: skuRoot, // Or map this to a human-readable name
    },
    variations: [variation],
  };

  try {
    await ProductModel.create(productData);
    console.log(`Inserted ${productReference} into MongoDB`);
  } catch (error) {
    console.error(`Error inserting ${productReference} into MongoDB:`, error);
  }
}
