import { ProductModel } from '@/models/product';

import { CsvRow, Variation, ProductDoc, Price, CsvRowRollerblade } from '@/types/products';

export async function processRollerbladeProduct(row: CsvRowRollerblade): Promise<void> {

  const sku = row.Reference;
  const productReference = row.idCode;
  const ean = row.EAN;
  const stockValue = typeof row.Stock === 'string' ? row.Stock : String(row.Stock || '0');
  const stock = parseInt(stockValue, 10);
  
  let priceValue = 0;
  if (row.Price) {
    if (typeof row.Price === 'object') {
      priceValue = row.Price.pvp || 0;
    } else {
      priceValue = parseFloat(String(row.Price));
    }
  }
  const image = row.Image || '';
  const brand = row.Brand;
  const name = row.Name;
  const weight = parseFloat(row.Weight || '0');
  const color = (row.ColorNombre || row.ColorBase || row.ColorCodigo || '').trim();
  const sizes = row?.Size;
  const family = row.Family || '';

  if (!ean || !sku || !brand || !name || isNaN(priceValue) || isNaN(stock)) {
    console.warn(`Skipping ${productReference}: invalid data (price, stock, EAN, or required fields)`);
    return;
  }

  const priceObject: Price = {
    pvp: priceValue,
    pv: priceValue * 0.8,
    benefit_percentage: 20
  };

  const variation: Variation = {
    sku,
    ean,
    size: Array.isArray(sizes) ? sizes[0] || '' : (typeof sizes === 'string' ? sizes : ''),
    color,
    stock,
    price: priceObject,
    image,
  };

  const productData: ProductDoc = {
    parentReference: sku,
    reference: sku,
    ean13: ean,
    name,
    brand,
    colors: color ? [color] : [],
    sizes: Array.isArray(sizes) ? sizes : (typeof sizes === 'string' && sizes ? [sizes] : []),
    price: priceObject,
    stock,
    image,
    description: `${brand} ${name}`,
    weight,
    status: 'active',
    category: {
      code: ean,
      name: family
    },
    variations: [variation],
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
