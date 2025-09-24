import { getOrGenerateDescriptionAI } from '@/utils/csv/getOrGenerateDescriptionAI';
import { ProductModel } from '@/models/product';
import { extractColor, extractCSizes } from '@/utils/proces/parserUniverskate';
import { CsvRow, Variation, ProductForDescription } from '@/types/products';


export async function processUniverskateGroup(
  skuRoot: string,
  rows: CsvRow[]
): Promise<any | null> {
  if (!rows.length) return null;

  const first = rows[0];
  const name = (first.Name || first.name)?.split(/Black|Blue|Red|Orange/i)[0]?.trim() || '';
  const brand = first.Brand || first.brand || '';
  const weight = parseFloat((first.Weight || first.weight) || '0');

  const variations: Variation[] = rows.map(row => {
    const sku = row.Reference || row.reference || '';
    const ean = row.ean13;
    const stock = parseInt(String(row.Stock || row.stock || '0'), 10);
    
    let priceValue = 0;
    if (row.Price) {
      if (typeof row.Price === 'object') {
        priceValue = row.Price.pvp || 0;
      } else {
        priceValue = parseFloat(String(row.Price));
      }
    } else if (row.price) {
      if (typeof row.price === 'object') {
        priceValue = row.price.pvp || 0;
      } else {
        priceValue = parseFloat(String(row.price));
      }
    }
    
    const image = row.Image || row.image || '';
    const color = extractColor(sku || '') || '';
    const sizes = extractCSizes(sku || '') || [];

    return {
      sku,
      ean,
      size: sizes[0] || '',
      color,
      stock,
      price: {
        pvp: priceValue,
        pv: priceValue * 0.8,
        benefit_percentage: 20
      },
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
    reference: first.Reference ?? '',
    ean13: first.ean13 ?? '',
    colors,
    sizes,
    price: typeof first.Price === 'object'
      ? {
          pvp: Number(first.Price.pvp ?? 0),
          pv: Number(first.Price.pv ?? 0),
          benefit_percentage: Number(first.Price.benefit_percentage ?? 0),
        }
      : { pvp: Number(first.Price ?? 0), pv: Number(first.Price ?? 0), benefit_percentage: 0 },
    stock: Number(first.Stock ?? 0),
  };

  const description = await getOrGenerateDescriptionAI(
    first.Reference ?? '',
    first.Description ?? '',
    productForAI
  );

  // ------------------------------
  // Build product document
  // ------------------------------
  const priceNumber =
    typeof first.Price === 'object'
      ? Number(first.Price.pvp ?? 0)
      : Number(first.Price ?? 0);
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
