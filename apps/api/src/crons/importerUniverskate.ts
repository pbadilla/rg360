import axios from 'axios';
import fs from 'fs';

import basicAuth from 'basic-auth-header';
import { removeFirstRow, importCSVUniverskate } from '@/utils/importCSVUniverskate';
import { Request, Response } from 'express';

const importerUniverskate = async (req: Request, res: Response): Promise<void> => {
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

    writer.on('finish', () => {
      removeFirstRow(path);
      importCSVUniverskate(path);
      res.send('File downloaded and processed.');
    });

    writer.on('error', () => {
      res.status(500).send('Error writing file.');
    });
  } catch (err: any) {
    res.status(500).send('Download failed: ' + err.message);
  }
};

export { importerUniverskate };
