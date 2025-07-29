// apps/api/src/scripts/universkate/processUniverskateGroup.ts

import { ProductModel } from '@/models/product';
import { extractColor, extractCSizes } from '@/utils/parserUniverskate';
import { CsvRow, Variation, ProductDoc } from '@/types/csvUniverskate';

export async function processUniverskateGroup(skuRoot: string, rows: CsvRow[]) {
  const first = rows[0];

  const name = first.Name?.split(/Black|Blue|Red|Orange/i)[0]?.trim() ?? '';
  const brand = first.Brand;
  const weight = parseFloat(first.Weight || '0');

  const variations: Variation[] = rows.map(row => {
    const sku = row.Reference;
    const ean = row.EAN;
    const stock = parseInt(row.Stock || '0', 10);
    const price = parseFloat(row.Price || '0');
    const image = row.Image;
    const color = extractColor(sku) || '';
    const sizes = extractCSizes(sku) || [];

    return {
      sku,
      ean,
      size: sizes[0] || '',
      color,
      stock,
      price,
      image,
    };
  });

  const colors = [...new Set(variations.map(v => v.color))];
  const sizes = [...new Set(variations.map(v => v.size))];

  const productData: ProductDoc = {
    parentReference: skuRoot,
    reference: first.Reference,
    ean13: first.EAN,
    name,
    brand,
    weight,
    status: 'active',
    category: {
      code: skuRoot,
      name: skuRoot,
    },
    colors,
    sizes,
    variations,
  };

  try {
    const doc = await ProductModel.findOneAndUpdate(
      { parentReference: skuRoot },
      productData,
      { upsert: true, new: true }
    );
    console.log(`Upserted grouped product ${skuRoot}`);
    return doc;
  } catch (err) {
    console.error(`Error upserting ${skuRoot}:`, err);
    return null;
  }
}
