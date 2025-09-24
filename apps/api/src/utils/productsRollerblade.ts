import { CsvRow } from '@/types/products';
import { extractColor, extractCSizes } from '@/utils/parserUniverskate';

/**
 * Process Rollerblade CSV products
 */
export function productsRollerbladeProcessing(csvRows: CsvRow[]): any[] {
  return csvRows.map(row => ({
    sku: row.reference,
    name: row.name,
    brand: row.brand,
    price: row.price,
    stock: row.stock,
    color: extractColor(row.reference),
    sizes: extractCSizes(row.reference),
    image: row.image,
    ean: row.ean13,
    family: row.family
  }));
}