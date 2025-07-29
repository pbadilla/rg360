import axios from 'axios';
import fs from 'fs';
import basicAuth from 'basic-auth-header';
import { Request, Response } from 'express';
import { removeFirstRow } from '@/utils/removeFirstRow';
import { CsvRow } from '@/types/csvUniverskate';
import { processUniverskateGroup } from './processUniverskateGroup';

const downloadUniverskateCSV = async (req: Request, res: Response): Promise<void> => {
  const url = 'https://csvshops.universkate.com/UniverskateStock.csv';
  const path = './universkate.csv';
  const auth = basicAuth('csvuniverskate', 'ZeF1@TENbu');

  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: { Authorization: auth },
    });

    const writer = fs.createWriteStream(path);
    response.data.pipe(writer);

    writer.on('finish', async () => {
      try {
        removeFirstRow(path);
        const csvData = fs.readFileSync(path, 'utf-8');

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
            Reference: raw['PRODUCT REF'],
            EAN: raw['EAN13 CODE'],
            Price: raw['RETAIL PRICE'],
            Stock: raw['AVAILABLE STOCK'],
            Name: raw['PRODUCT DESCRIPTION'],
            Image: raw['PICTURES'],
            Brand: raw['BRAND'],
            Family: raw['MOTHER REF'],
            Weight: '0', // fallback
          };
        });

        // Group by Family
        // const row of csvRows.slice(0, 50/ v limite
        const grouped: Record<string, CsvRow[]> = {};
        for (const row of csvRows) {
          if (!grouped[row.Family]) grouped[row.Family] = [];
          grouped[row.Family].push(row);
        }

        const results = [];
        for (const [skuRoot, rows] of Object.entries(grouped)) {
          const result = await processUniverskateGroup(skuRoot, rows);
          results.push(result);
        }

        const successCount = results.filter(r => !r.errors || r.errors.length === 0).length;
        const failedGroups = results.filter(r => r.errors && r.errors.length > 0);

        res.json({
          message: 'Processed grouped Universkate products',
          totalGroups: results.length,
          successGroups: successCount,
          failedGroupsCount: failedGroups.length,
          successSkuRoots: results
            .filter(r => !r.errors || r.errors.length === 0)
            .map(r => r.skuRoot),
          errors: failedGroups.map(r => ({ skuRoot: r.skuRoot, errors: r.errors })),
          products: results,
        });
      } catch (err) {
        res.status(500).send('Processing failed: ' + (err as Error).message);
      }
    });

    writer.on('error', () => {
      res.status(500).send('Error writing file.');
    });
  } catch (err: any) {
    res.status(500).send('Download failed: ' + err.message);
  }
};

export { downloadUniverskateCSV };
