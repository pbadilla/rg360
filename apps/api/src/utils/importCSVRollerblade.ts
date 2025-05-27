
import csv from 'csv-parser';
import { productsRollerbladeProcessing } from '@/utils/productsRollerblade';

export async function importCSVRollerblade(filePath: string): Promise<void> {
  if (!fs.existsSync(filePath)) return;

  const processingPromises: Promise<void>[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({
        separator: ';',
        mapHeaders: ({ header }) =>
          header.replace(/\u00A0/g, ' ').trim()
      }))
      .on('data', (row: Record<string, string>) => {
        processingPromises.push(productsRollerbladeProcessing(row));
      })
      .on('end', async () => {
        try {
          await Promise.all(processingPromises);
          console.log('✅ All rows processed and saved to DB');
          resolve();
        } catch (err) {
          console.error('❌ Error in processing rows:', err);
          reject(err);
        }
      })
      .on('error', (err) => {
        console.error('❌ CSV reading error:', err);
        reject(err);
      });
  });
}
