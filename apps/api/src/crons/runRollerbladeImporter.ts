import { Client } from 'basic-ftp';
import fs from 'fs';
import { importCSVRollerblade } from '@/utils/importCSVRollerblade';
import { CsvRow } from '@/types/products';

async function runImporter() {
  const localPath = './stocks.csv';
  const remotePath = '/stocks.csv';

  const ftpHost = process.env.IMPORTER_BMSPORTECH_FTP;
  const ftpUser = process.env.IMPORTER_BMSPORTECH_USER;
  const ftpPassword = process.env.IMPORTER_BMSPORTECH_PASSWORD;

  if (!ftpHost || !ftpUser || !ftpPassword) {
    throw new Error('Missing FTP credentials in environment variables.');
  }

  const auth = {
    user: ftpUser,
    password: ftpPassword,
  };

  try {
    const client = new Client();

    await client.access({
      host: ftpHost,
      user: auth.user,
      password: auth.password,
      secure: true,
      secureOptions: {
        rejectUnauthorized: false,
      },
    });

    await client.downloadTo(localPath, remotePath);
    await client.close();

    const csvData = parseCsvFile(localPath);
    await importCSVRollerblade(csvData);
    console.log('File downloaded and processed successfully.');
  } catch (err: any) {
    console.error('Download or processing failed:', err.message);
    process.exit(1);
  }
}

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

runImporter();
