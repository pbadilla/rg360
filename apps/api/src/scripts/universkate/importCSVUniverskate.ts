import fs from 'fs';
import { CsvRow } from '@/types/products';
import { processUniverskateGroup } from '@/utils/csv/processUniverskateGroup';

/**
 * Remove first row from CSV file
 */
export function removeFirstRow(filePath: string): void {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    
    if (lines.length > 1) {
      const remainingLines = lines.slice(1);
      fs.writeFileSync(filePath, remainingLines.join('\n'));
      console.log(`Removed first row from ${filePath}`);
    }
  } catch (error) {
    console.error(`Error removing first row from ${filePath}:`, error);
    throw error;
  }
}

/**
 * Import CSV data from Universkate
 */
export async function importCSVUniverskate(filePath: string): Promise<void> {
  try {
    const csvData = fs.readFileSync(filePath, 'utf-8');
    
    const lines = csvData
      .split('\n')
      .filter(line => line.trim().length > 0);

    const headers = lines[0].split(';').map(h => h.trim().replace(/\r/g, ''));
    const dataRows = lines.slice(1);

    const csvRows: CsvRow[] = dataRows.map(line => {
      const values = line.split(';');
      const raw: any = {};
      headers.forEach((key, index) => {
        raw[key] = values[index]?.trim() || '';
      });

      return {
        reference: raw['PRODUCT REF'] || '',
        ean13: raw['EAN13 CODE'] || '',
        price: {
          pvp: parseFloat(raw['RETAIL PRICE'] || '0'),
          pv: parseFloat(raw['WHOLESALE PRICE'] || '0'),
          benefit_percentage: 0
        },
        stock: parseInt(raw['AVAILABLE STOCK'] || '0', 10),
        name: raw['PRODUCT DESCRIPTION'] || '',
        image: raw['PICTURES'] || '',
        brand: raw['BRAND'] || '',
        family: raw['MOTHER REF'] || '',
        weight: '0',
      };
    });

    // Group by family and process
    const grouped: Record<string, CsvRow[]> = {};
    for (const row of csvRows) {
      const family = row.family;
      if (!family) continue;
      
      if (!grouped[family]) {
        grouped[family] = [];
      }
      grouped[family].push(row);
    }

    const results = [];
    for (const [skuRoot, rows] of Object.entries(grouped)) {
      try {
        const result = await processUniverskateGroup(skuRoot, rows);
        results.push(result);
        console.log(`Processed group: ${skuRoot}`);
      } catch (error) {
        console.error(`Error processing group ${skuRoot}:`, error);
        results.push({
          skuRoot,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    console.log(`Processed ${results.length} product groups from Universkate CSV`);
    
  } catch (error) {
    console.error('Error importing Universkate CSV:', error);
    throw error;
  }
}