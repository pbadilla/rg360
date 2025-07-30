import { ProductModel } from '@/models/product';
import { CsvRowRollerblade, ProductDoc, Variation } from '@/types/CSVProducts';

export async function processRollerbladeGroup(
  idCode: string,
  rows: CsvRowRollerblade[]
): Promise<{ success: boolean; message?: string }> {
  if (!rows.length) return { success: false, message: 'Empty group' };

  const first = rows[0];
  const productName = first.Name;
  const brand = first.Brand;
  const family = first.Family || '';
  const weight = parseFloat(first.Weight || '0');

  const variations: Variation[] = rows
    .filter(row => row.EAN && row.Reference)
    .map(row => {
      const price = parseFloat(row.Price || '0');
      const stock = parseInt(row.Stock || '0', 10);
      const size = typeof row.Size === 'string' ? row.Size.trim() : '';
      const color = (row.ColorNombre || row.ColorBase || row.ColorCodigo || '').trim();
      const image = row.Image || '';

      return {
        sku: row.Reference,
        ean: row.EAN,
        price,
        stock,
        size,
        color,
        image,
      };
    });

  const uniqueSizes = Array.from(new Set(variations.map(v => v.size).filter(Boolean)));
  const uniqueColors = Array.from(new Set(variations.map(v => v.color).filter(Boolean)));

  const product: ProductDoc = {
    reference: idCode,
    parentReference: idCode,
    ean13: first.EAN,
    name: productName,
    brand,
    weight,
    status: 'active',
    category: {
      code: idCode,
      name: family,
    },
    variations,
    sizes: uniqueSizes,
    colors: uniqueColors,
  };

  try {
    await ProductModel.updateOne(
      { reference: idCode },
      { $set: product },
      { upsert: true }
    );
    console.log(`Upserted grouped product ${idCode} with ${variations.length} variations`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to upsert product group ${idCode}:`, error);
    const message = typeof error === 'object' && error !== null && 'message' in error
      ? String((error as { message?: unknown }).message)
      : 'Unknown error';
    return { success: false, message };
  }
}
