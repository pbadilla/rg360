import { ProductModel } from '@/models/product';
import { CsvRowRollerblade, ProductDoc, Variation } from '@/types/products';

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
  const description = first.Description || '';

  const variations: Variation[] = rows
    .filter(row => row.ean13 && row.Reference)
    .map(row => {
      const price = parseFloat(row.Price || '0');
      const stock = parseInt(row.Stock || '0', 10);
      const size = typeof row.Size === 'string' ? row.Size.trim() : '';
      const color = (row.ColorNombre || row.ColorBase || row.ColorCodigo || '').trim();
      const image = row.Image || '';

      return {
        sku: row.Reference,
        ean: row.ean13,
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
    description, // <-- now defined
    ean13: first.ean13,
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
    price: parseFloat(first.Price || '0'),
    stock: parseInt(first.Stock || '0', 10),
    images: rows.map(r => r.Image).filter(Boolean) as string[],
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
