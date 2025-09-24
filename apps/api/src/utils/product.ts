import { CsvRow, ProductDoc } from '@/types/products';

/**
 * Process a single product from CSV data
 */
export function processProduct(csvRow: CsvRow): ProductDoc {
  return {
    name: csvRow.name,
    description: csvRow.description || '',
    reference: csvRow.reference,
    ean13: csvRow.ean13,
    brand: csvRow.brand,
    weight: csvRow.weight ? parseFloat(csvRow.weight) : 0,
    price: csvRow.price || { pvp: 0, pv: 0, benefit_percentage: 0 },
    stock: typeof csvRow.stock === 'string' ? parseInt(csvRow.stock) : csvRow.stock || 0,
    status: 'active',
    category: {
      code: csvRow.family || 'general',
      name: csvRow.family || 'General'
    },
    variations: [{
      sku: csvRow.reference,
      ean: csvRow.ean13,
      size: csvRow.size || '',
      color: csvRow.color || '',
      stock: typeof csvRow.stock === 'string' ? parseInt(csvRow.stock) : csvRow.stock || 0,
      price: csvRow.price || { pvp: 0, pv: 0, benefit_percentage: 0 },
      image: csvRow.image || ''
    }],
    colors: csvRow.color ? [csvRow.color] : [],
    sizes: csvRow.size ? [csvRow.size] : [],
    images: csvRow.image ? [csvRow.image] : []
  };
}

/**
 * Process multiple products from CSV data
 */
export function processProducts(csvRows: CsvRow[]): ProductDoc[] {
  return csvRows.map(processProduct);
}