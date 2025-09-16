import { CsvRow, GroupedProduct, Variation } from '@/types/products';
import { extractColor, extractCSizes } from '@/utils/proces/parserUniverskate';
import { getBaseName } from '@/utils/getBaseName';

const DEFAULT_IMAGE = 'https://example.com/default-image.png';

export function groupByPrefix(rows: CsvRow[]): GroupedProduct[] {
  const grouped: Record<string, CsvRow[]> = {};

  // Group rows by Family / prefix
  for (const row of rows) {
    if (!grouped[row.Family]) grouped[row.Family] = [];
    grouped[row.Family].push(row);
  }

  // Map each group to GroupedProduct
  return Object.entries(grouped).map(([skuRoot, items]) => {
    const first = items[0];

    const variations: Variation[] = items.map(row => ({
      sku: row.Reference,
      ean: row.ean13,
      size: extractCSizes(row.Reference)?.[0] || '',
      color: extractColor(row.Reference) || '',
      stock: parseInt(String(row.Stock ?? 0), 10),
      price: {
        pvp: Number(row.Price?.pvp ?? 0),
        pv: Number(row.Price?.pv ?? 0),
        benefit_percentage: Number(row.Price?.benefit_percentage ?? 0),
      },
      image: row.Image || DEFAULT_IMAGE,
    }));

    const colors = Array.from(new Set(variations.map(v => v.color).filter(Boolean)));
    const sizes = Array.from(new Set(variations.map(v => v.size).filter(Boolean)));

    return {
      skuRoot,
      reference: first.Reference,
      ean13: first.ean13,
      name: getBaseName(first.Name, colors, sizes),
      brand: first.Brand,
      colors,
      sizes,
      variations,
      images: items.map(r => r.Image || DEFAULT_IMAGE),
      price: {
        pvp: Number(first.Price?.pvp ?? 0),
        pv: Number(first.Price?.pv ?? 0),
        benefit_percentage: Number(first.Price?.benefit_percentage ?? 0),
      },       // main price for grouped product
      stock: parseInt(String(first.Stock ?? 0), 10),
      category: undefined, // will be enriched later
    };
  });
}
