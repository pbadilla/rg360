
import csv from 'csv-parser';

import { productsUniverskateProcessing } from '@/utils/productsUniverskate';

// Define the ProductRow interface
interface ProductRow {
  Reference: string;
  Stock: number;
  // Add other necessary fields here
}

// Function to remove the first row from a CSV file
export function removeFirstRow(filePath: string): void {
  const data = fs.readFileSync(filePath, 'utf8').split('\n');
  data.shift();
  fs.writeFileSync(filePath, data.join('\n'));
}

// Function to import and process a CSV file
export function importCSVUniverskate(filePath: string): void {
  debugger;
  if (!fs.existsSync(filePath)) return;

  let rowCount = 0;

  interface CsvRow {
    [key: string]: string;
  }

  fs.createReadStream(filePath)
  .pipe(csv({ separator: ';' }))
  .on('data', async (row: Record<string, string>) => {
    rowCount++;
    if (rowCount > 1) {
      try {
        await productsUniverskateProcessing(row);
      } catch (err) {
        console.error('Processing error:', err);
      }
    }
  })
  .on('end', () => {
    console.log('UniverSkate CSV file successfully processed');
  });
}
