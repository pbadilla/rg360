import { Client } from 'basic-ftp';
import fs from 'fs';
import { Request, Response } from 'express';
import { importCSVRollerblade } from '@/utils/importCSVRollerblade';
import { CsvRow } from '@/types/products';

const importerRollerblade = async (req: Request, res: Response): Promise<void> => {
  const localPath = './stocks.csv';
  const remotePath = '/stocks.csv';
  const ftpHost = 'bmsportech.com';
  const auth = {
    user: 'cliente_rollergrind360',
    password: 'aue9kpr@DPV.hgp7ufz',
  };

  const isLocalEnv = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local';

  if (isLocalEnv) {
    try {
      // Read and parse CSV file
      const csvData = parseCsvFile(localPath);
      await importCSVRollerblade(csvData);
      res.send('Local file processed.');
    } catch (err: any) {
      res.status(500).send('Local file processing failed: ' + err.message);
    }
    return;
  }

  const client = new Client();

  try {
    // Connect to the FTP server using FTPS with disabled certificate validation
    await client.access({
      host: ftpHost,
      user: auth.user,
      password: auth.password,
      secure: true,
      secureOptions: {
        rejectUnauthorized: false,
      },
    });

    // Download the file
    await client.downloadTo(localPath, remotePath);

    await client.close();

    // Process the downloaded file
    const csvData = parseCsvFile(localPath);
    await importCSVRollerblade(csvData);
    res.send('File downloaded and processed.');
  } catch (err: any) {
    res.status(500).send('Download failed: ' + err.message);
  }
};

function parseCsvFile(filePath: string): CsvRow[] {
  const csvData = fs.readFileSync(filePath, 'utf-8');
  const lines = csvData.split('\n').filter(line => line.trim().length > 0);
  
  if (lines.length < 2) {
    return [];
  }
  
  const headers = lines[0].split(';').map(h => h.trim());
  const dataRows = lines.slice(1);
  
  return dataRows.map(line => {
    const values = line.split(';');
    const row: any = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() || '';
    });
    
    // Map to CsvRow structure
    return {
      reference: row['Reference'] || row['reference'] || '',
      ean13: row['EAN13'] || row['EAN'] || row['ean13'] || '',
      name: row['Name'] || row['name'] || '',
      brand: row['Brand'] || row['brand'] || '',
      family: row['Family'] || row['family'] || '',
      price: {
        pvp: parseFloat(row['Price'] || row['price'] || '0'),
        pv: 0,
        benefit_percentage: 0
      },
      stock: parseInt(row['Stock'] || row['stock'] || '0'),
      image: row['Image'] || row['image'] || '',
      weight: row['Weight'] || row['weight'] || '0',
      color: row['Color'] || row['color'] || '',
      size: row['Size'] || row['size'] || ''
    } as CsvRow;
  });
}

export { importerRollerblade };
