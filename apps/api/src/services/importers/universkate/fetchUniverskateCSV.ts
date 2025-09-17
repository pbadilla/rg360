// services/fetchUniverskateCSV.ts
import axios from 'axios';
import fs from 'fs';
import basicAuth from 'basic-auth-header';
import { removeFirstRow } from '@/utils/removeFirstRow';
import { CsvRow } from '@/types/products';
import { formatPriceForMongoDB } from '@/utils/prices';

export async function fetchUniverskateCSV(): Promise<CsvRow[]> {
  const url = 'https://csvshops.universkate.com/UniverskateStock.csv';
  const path = './universkate.csv';
  const auth = basicAuth('csvuniverskate', 'ZeF1@TENbu');

  const response = await axios.get(url, {
    responseType: 'stream',
    headers: { Authorization: auth },
  });

  const writer = fs.createWriteStream(path);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      try {
        removeFirstRow(path);
        const csvData = fs.readFileSync(path, 'utf-8');

        const lines = csvData.split('\n').filter(line => line.trim().length > 0);
        const headers = lines[0].split(';').map(h => h.trim().replace(/\r/g, ''));
        const dataRows = lines.slice(1);


        const csvRows: CsvRow[] = dataRows.map(line => {
          const values = line.split(';');
          const raw: any = {};
          headers.forEach((key, index) => {
            raw[key] = values[index]?.trim() || '';
          });

          const retailPrice = formatPriceForMongoDB(raw['RETAIL PRICE'])
          const purchasePrice = formatPriceForMongoDB(raw['PURCHASE PRICE'])

          return {
            Reference: raw['PRODUCT REF'],
            ean13: raw['EAN13 CODE'],
            Price: {
              pvp: retailPrice,
              pv: purchasePrice,
              benefit_percentage: 0,
            },
            Stock: parseInt(raw['AVAILABLE STOCK'] || '0', 10),
            Name: raw['PRODUCT DESCRIPTION'],
            Image: raw['PICTURES'],
            Brand: raw['BRAND'],
            Categories: raw['CATEGORIES'],
            Family: raw['MOTHER REF'],
            Weight: '0',
          };
        });

        resolve(csvRows);
      } catch (err) {
        reject(err);
      }
    });

    writer.on('error', reject);
  });
}
