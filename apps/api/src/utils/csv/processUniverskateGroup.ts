import { getOrGenerateDescriptionAI } from '@/utils/csv/getOrGenerateDescriptionAI';
import { ProductModel } from '@/models/product';
import { extractColor, extractCSizes } from '@/utils/proces/parserUniverskate';
import { CsvRow, Variation, ProductForDescription } from '@/types/products';
import { formatPriceForMongoDB } from '@/utils/prices';

export async function processUniverskateGroup(
  skuRoot: string,
  rows: CsvRow[]
): Promise<any | null> {
  if (!rows.length) return null;

  const first = rows[0];
  const name = first.Name?.split(/Black|Blue|Red|Orange/i)[0]?.trim() || '';
  const brand = first.Brand;
  const weight = parseFloat(first.Weight || '0');

  const variations: Variation[] = rows.map(row => {
    const sku = row.Reference;
    const ean = row.ean13;
    const stock = parseInt(String(row.Stock || '0'), 10);
    const price = parseFloat(String(row.Price || '0'));
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

  const colors = Array.from(new Set(variations.map(v => v.color).filter(Boolean)));
  const sizes = Array.from(new Set(variations.map(v => v.size).filter(Boolean)));

  // ------------------------------
  // Use helper to get description
  // ------------------------------
  const productForAI: ProductForDescription = {
    brand,
    reference: first.Reference,
    ean13: first.ean13,
    colors,
    sizes,
    price: parseFloat(first.Price || '0'),
    stock: parseInt(String(first.Stock || '0'), 10),
  };

  const description = await getOrGenerateDescriptionAI(first.Reference, first.Description, productForAI);

  // ------------------------------
  // Build product document
  // ------------------------------
  const priceNumber = parseFloat(first.Price || '0');
  const productData = {
    parentReference: skuRoot,
    reference: first.Reference,
    ean13: first.ean13,
    description,
    name,
    brand,
    weight,
    status: 'active',
    category: { code: skuRoot, name: skuRoot },
    colors,
    sizes,
    price: {
      pvp: priceNumber,
      pv: priceNumber,
      benefit_percentage: 0,
    },
    stock: parseInt(String(first.Stock || '0'), 10),
    variations: [] as unknown[],
    images: rows.map(r => r.Image).filter(Boolean) as string[],
  };

  try {
    const doc = await ProductModel.findOneAndUpdate(
      { parentReference: skuRoot },
      { $set: productData },
      { upsert: true, new: true }
    );
    console.log(`Inserted/Updated grouped product ${skuRoot}`);
    return doc;
  } catch (err) {
    console.error(`Error upserting ${skuRoot}:`, err);
    return null;
  }
}
