// services/importers/universkate/groupProduct.ts
import { CsvRow, GroupedProduct, Variation } from '@/types/products';
import { extractColor, extractCSizes } from '@/utils/proces/parserUniverskate';
import { getBaseName } from '@/utils/getBaseName';
import categoryMap from '@/utils/json/categories.json';

const DEFAULT_IMAGE = 'https://example.com/default-image.png';

export function groupByPrefix(rows: CsvRow[]): GroupedProduct[] {
  const grouped: Record<string, CsvRow[]> = {};

  // 1️⃣ Group rows by Family / prefix
  for (const row of rows) {
    const family = row.Family || row.family || 'unknown';
    if (!grouped[family]) grouped[family] = [];
    grouped[family].push(row);
  }

  // 2️⃣ Map each group to GroupedProduct
  return Object.entries(grouped).map(([skuRoot, items]) => {
    const first = items[0];

    
    const variations: Variation[] = items.map(row => ({
      sku: row.Reference || row.reference || '',
      ean: row.ean13,
      size: extractCSizes(row.Reference || row.reference || '')?.[0] || '',
      color: extractColor(row.Reference || row.reference || '') || '',
      stock: parseInt(String(row.Stock || row.stock || 0), 10),
      price: {
        pvp: Number(row.Price?.pvp ?? 0),
        pv: Number(row.Price?.pv ?? 0),
        benefit_percentage: Number(row.Price?.benefit_percentage ?? 0),
      },
      image: row.Image?.[0] || row.image?.[0] || DEFAULT_IMAGE,
    }));

    const colors = Array.from(new Set(variations.map(v => v.color).filter(Boolean)));
    const sizes = Array.from(new Set(variations.map(v => v.size).filter(Boolean)));


    return {
      skuRoot,
      reference: first.Reference || first.reference || '',
      ean13: first.ean13,
      name: getBaseName(first.Name || first.name || '', colors, sizes),
      brand: first.Brand || first.brand || '',
      colors,
      sizes,
      variations,
      images: Array.from(
        new Set(
          items.flatMap(r => (r.Image || r.image || [DEFAULT_IMAGE]))
        )
      ),
      price: {
        pvp: Number(first.Price?.pvp ?? 0),
        pv: Number(first.Price?.pv ?? 0),
        benefit_percentage: Number(first.Price?.benefit_percentage ?? 0),
      },
      stock: parseInt(String(first.Stock || first.stock || 0), 10),
      categories: first.Categories,
    };
  });
}
