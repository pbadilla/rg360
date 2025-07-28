import axios from 'axios';
import fs from 'fs';

import basicAuth from 'basic-auth-header';
import { processUniverskateProduct } from 'src/scripts/universkate/processUniverskateProduct';
import { Request, Response } from 'express';
import { removeFirstRow } from '@/utils/removeFirstRow';

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
        const rows = csvData
          .split('\n')
          .filter(line => line.trim().length > 0)
          .map(line => line.split(',')); // Adjust parsing as needed for CsvRow

        // Assuming CsvRow is a type representing a row, and processUniverskateProduct expects a CsvRow
        // Here, process each row individually
        const results = [];
        for (const row of rows) {
          // You may need to convert 'row' to CsvRow type if it's an object
          const result = await processUniverskateProduct(row as any); // Replace 'any' with CsvRow if imported
          results.push(result);
        }

        res.json({
          message: 'File downloaded and processed.',
          results,
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
