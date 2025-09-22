import { ProductModel } from '@/models/product';
import { CsvRowRollerblade, Variation, Price } from '@/types/products';

export async function processRollerbladeGroup(
  idCode: string,
  rows: CsvRowRollerblade[]
): Promise<{ success: boolean; message?: string, product?: any }> {
  if (!rows.length) return { success: false, message: 'Empty group' };

  const first = rows[0];

  const productName = first.name;
  const brand = first.brand;
  const family = first.family || '';
  const weight = parseFloat(first.weight || '0');

  // ------------------------------
  // Build variations
  // ------------------------------
  const variations: Variation[] = rows
    .filter(row => row.ean13 && row.reference)
    .map(row => {
      const priceValue = row.price?.pvp || 0;
      const price: Price = { pvp: priceValue, pv: priceValue, benefit_percentage: 0 };
      const stock = parseInt(String(row.stock || 0), 10);
      const size = typeof row.size === 'string' ? row.size.trim() : '';
      const color = (row.colorNombre || row.colorBase || row.colorCodigo || '').trim();
      const image = row.image || '';

      return { sku: row.reference || row.reference, ean: row.ean13, price, stock, size, color, image };
    });

  const uniqueSizes = Array.from(new Set(variations.map(v => v.size).filter(Boolean)));
  const uniqueColors = Array.from(new Set(variations.map(v => v.color).filter(Boolean)));

  const priceValue = first.price?.pvp || 0;

  // ------------------------------
  // Build main product object
  // ------------------------------
  const product: any = {
    reference: idCode,
    parentReference: idCode,
    description: first.description || '', // use provided description
    ean13: first.ean13,
    name: productName,
    brand,
    family,
    weight,
    status: 'active',
    category: { code: idCode, name: family },
    variations,
    sizes: uniqueSizes,
    colors: uniqueColors,
    price: { pvp: priceValue, pv: priceValue, benefit_percentage: 0 },
    stock: parseInt(String(first.stock || 0), 10),
    images: rows.map(r => r.image).filter(Boolean),
  };

  try {
    await ProductModel.updateOne({ reference: idCode }, { $set: product }, { upsert: true });
    console.log(`Upserted grouped product ${idCode} with ${variations.length} variations`);
    return { success: true, product };
  } catch (error) {
    console.error(`Failed to upsert product group ${idCode}:`, error);
    const message = typeof error === 'object' && error !== null && 'message' in error
      ? String((error as { message?: unknown }).message)
      : 'Unknown error';
    return { success: false, message };
  }
}
