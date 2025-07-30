import { ProductModel } from '@/models/product';

import { CsvRowRollerblade, Variation, ProductDoc } from '@/types/CSVProducts';

export async function processRollerbladeProduct(row: CsvRowRollerblade): Promise<void> {

  const sku = row.Reference;
  const productReference = row.idCode;
  const ean = row.EAN;
  const stock = parseInt(row.Stock || '0', 10);
  const price = parseFloat(row.Price || '0');
  const image = row.Image || '';
  const brand = row.Brand;
  const name = row.Name;
  const weight = parseFloat(row.Weight || '0');
  const color = (row.ColorNombre || row.ColorBase || row.ColorCodigo || '').trim();
  const sizes = row?.Size;
  const family = row.Family || '';

  if (!ean || isNaN(price) || isNaN(stock)) {
    console.warn(`Skipping ${productReference}: invalid data (price, stock or EAN)`);
    return;
  }

  const variation: Variation = {
    sku,
    ean,
    size: Array.isArray(sizes) ? sizes[0] || '' : (typeof sizes === 'string' ? sizes : ''),
    color,
    stock,
    price,
    image,
  };

  const productData: ProductDoc = {
    parentReference: sku,
    reference: sku,
    ean13: ean,
    name,
    brand,
    weight,
    status: 'active',
    category: {
      code: ean,
      name: family
    },
    variations: [variation],
    colors: color ? [color] : [],
    sizes: Array.isArray(sizes) ? sizes : (typeof sizes === 'string' && sizes ? [sizes] : []),
  };

  try {
    await ProductModel.updateOne(
      { reference: sku },
      { $set: productData },
      { upsert: true }
    );
    console.log(`Upserted ${productReference} into MongoDB`);
  } catch (error) {
    console.error(`Error upserting ${productReference} into MongoDB:`, error);
  }
}
