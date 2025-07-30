import { ProductModel } from '@/models/product';
import { CsvRow, Variation, ProductDoc } from '@/types/csvUniverskate';

export async function processRollerbladeGroup(skuRoot: string, rows: CsvRow[]) {
  const first = rows[0];

  const name = first.Name?.trim();
  const brand = first.Brand;
  const weight = parseFloat(first.Weight || '0');
  const category = first.Family || skuRoot;

  // Collect all image URLs from all rows
  const images: string[] = Array.from(
    new Set(
      rows.flatMap(row => row.Image ? [row.Image] : [])
    )
  );

  // Generate variations (1 per row)
  const variations: Variation[] = rows.map(row => ({
    sku: row.Reference,
    ean: row.EAN,
    size: row.Size || row['Talla'] || '',
    color: row.Color || row['Color Nombre'] || '',
    stock: parseInt(row.Stock || '0', 10),
    price: parseFloat(row.Price || '0'),
    image: row.Image || '',
  }));

  const colors = [...new Set(variations.map(v => v.color).filter(Boolean))];
  const sizes = [...new Set(variations.map(v => v.size).filter(Boolean))];

  // Prepare product document
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
      name: category,
    },
    colors,
    sizes,
    images,
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
    return {
      skuRoot,
      errors: [err.message],
    };
  }
}
