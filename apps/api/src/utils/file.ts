
import csv from 'csv-parser';
import { processProduct } from '@/utils/product';
import fs from 'fs';

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
export function importFile(filePath: string): void {
  if (!fs.existsSync(filePath)) return;

  let rowCount = 0;

  interface CsvRow {
    [key: string]: string;
  }

  fs.createReadStream(filePath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row: CsvRow) => {
      rowCount++;
      if (rowCount > 1) {
        const productRow: ProductRow = {
          Reference: row['Reference'] || '',
          Stock: parseInt(row['Stock'] || '0', 10),
          // Add other necessary mappings here
        };
        processProduct(productRow);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}
