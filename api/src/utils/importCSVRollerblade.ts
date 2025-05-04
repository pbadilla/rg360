import fs from 'fs';
import csv from 'csv-parser';

import { productsRollerbladeProcessing } from '@/utils/productsRollerblade';

// Function to remove the first row from a CSV file
export function removeFirstRow(filePath: string): void {
  const data = fs.readFileSync(filePath, 'utf8').split('\n');
  data.shift();
  fs.writeFileSync(filePath, data.join('\n'));
}

// Function to import and process a CSV file
export function importCSVRollerblade(filePath: string): void {
  debugger;
  if (!fs.existsSync(filePath)) return;

  let rowCount = 0;

  fs.createReadStream(filePath)
  .pipe(csv({ separator: ';' }))
  .on('data', async (row: Record<string, string>) => {
    rowCount++;
    if (rowCount > 1) {
      try {
        await productsRollerbladeProcessing(row);
      } catch (err) {
        console.error('Processing error:', err);
      }
    }
  })
  .on('end', () => {
    console.log('Rollerblade CSV file successfully processed');
  });
}
