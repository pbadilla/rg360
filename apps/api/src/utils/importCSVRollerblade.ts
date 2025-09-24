import { CsvRow } from '@/types/products';

/**
 * Import and process Rollerblade CSV data
 */
export async function importCSVRollerblade(csvData: CsvRow[]): Promise<any[]> {
  try {
    console.log(`Processing ${csvData.length} Rollerblade CSV rows...`);
    
    // Group products by family
    const grouped = csvData.reduce((acc, row) => {
      const family = row.family;
      if (!family) return acc;
      
      if (!acc[family]) {
        acc[family] = [];
      }
      acc[family].push(row);
      return acc;
    }, {} as Record<string, CsvRow[]>);
    
    const results = [];
    
    // Process each group
    for (const [family, rows] of Object.entries(grouped)) {
      try {
        // Basic processing - combine variations
        const baseProduct = rows[0];
        const variations = rows.map(row => ({
          sku: row.reference,
          ean: row.ean13,
          size: row.size || '',
          color: row.color || '',
          stock: typeof row.stock === 'string' ? parseInt(row.stock) : row.stock || 0,
          price: row.price,
          image: row.image
        }));
        
        const processedProduct = {
          skuRoot: family,
          reference: baseProduct.reference,
          name: baseProduct.name,
          brand: baseProduct.brand,
          description: baseProduct.description,
          variations,
          success: true
        };
        
        results.push(processedProduct);
        
      } catch (error) {
        console.error(`Error processing Rollerblade family ${family}:`, error);
        results.push({
          skuRoot: family,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    console.log(`Processed ${results.length} Rollerblade product groups`);
    return results;
    
  } catch (error) {
    console.error('Error in importCSVRollerblade:', error);
    throw error;
  }
}