// apps/api/src/scripts/universkate/processUniverskateGroup.ts

import { ProductModel } from '@/models/product';
import { extractColor, extractCSizes } from '@/utils/proces/parserUniverskate';
import { CsvRow, Variation, ProductDoc } from '@/types/products';
import { generateDescription } from '@/services/huggingFaceAI';

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
    // TODO: have default image
    const image = row.Image || '';
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
  let description = '';

  // If not available, generate it with AI
  if (!description) {
    try {
      description = await generateDescription({
        brand,
        reference: first.Reference,
        ean: first.EAN,
        price: parseFloat(first.Price || '0'),
        stock: parseInt(first.Stock || '0', 10),
        colors,
        sizes,
      });
    } catch (err) {
      console.error(`❌ Failed to generate description for ${skuRoot}:`, err);
      description = ''; // fallback
    }
  }

  const productData: ProductDoc = {
    parentReference: skuRoot,
    reference: first.Reference,
    ean: first.EAN,
    ean13: first.EAN,
    description,
    name,
    brand,
    weight,
    status: 'active',
    category: { code: skuRoot, name: skuRoot },
    colors,
    sizes,
    price: parseFloat(first.Price || '0'), // <-- add
    stock: parseInt(first.Stock || '0', 10), // <-- add
    variations,
  };

  try {
    // Saved it to mongoDB
    const doc = await ProductModel.findOneAndUpdate(
      { parentReference: skuRoot },
      productData,
      { upsert: true, new: true }
    );
    console.log(`Inserted grouped product ${skuRoot}`);
    return doc;
  } catch (err) {
    console.error(`Error upserting ${skuRoot}:`, err);
    return null;
  }
}
