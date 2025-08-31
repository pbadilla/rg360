import fs from 'fs';
import ftp from 'basic-ftp';

import { Request, Response } from 'express';

import { CsvRowRollerblade } from '@/types/products';
import { processRollerbladeGroup } from '../../../utils/csv/processRollerbladeGroup';

const downloadRollerbladeProductsCSV = async (req: Request, res: Response): Promise<void> => {
  const path = './rollerbladeProducts.csv';
  const ftpOptions = {
    host: "ftp.bmsportech.com",
    user: "cliente_rollergrind360", // defaults to "anonymous"
    password: "aue9kpr@DPV.hgp7ufz",  // defaults to "anonymous@"
    port: 21,
    secure: true, // enable FTPS (explicit)
    secureOptions: {
      rejectUnauthorized: false, // allow self-signed certs
    },
  };

  const remoteFilePath = "./Pricat_ss25_rollerblade.csv"; // ← UPDATE with the correct remote path

  try {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    await client.access(ftpOptions);
    await client.downloadTo(path, remoteFilePath);
    client.close();

    const csvData = fs.readFileSync(path, 'utf-8');

    const lines = csvData
      .split('\n')
      .filter(line => line.trim().length > 0);

    const headers = lines[0].split('\t');
    const dataRows = lines.slice(1);

    const csvRows: CsvRowRollerblade[] = dataRows.map(line => {
      const values = line.split('\t'); // correct delimiter
      const raw: any = {};
      headers.forEach((key, index) => {
        raw[key] = values[index]?.trim() || '';
      });

      // Find first available image URL
      const imageKeys = ['Foto', 'Foto2', 'Foto3', 'Foto4', 'Foto5', 'Foto6', 'Foto7', 'Foto8', 'Foto9', 'Foto10', 'Foto11', 'Foto12'];
      const firstImage = imageKeys.map(k => raw[k]).find(url => url && url.startsWith('http'));

      return {
        EAN: raw['EAN'],
        Reference: raw['SKU'],
        idCode: raw['Art. Codigo'],
        Name: raw['Art. Nombre'],
        Color: raw['Color Nombre'],
        ColorBase: raw['Color Base'],
        ColorCodigo: raw['Color Codigo'],
        Size: raw['Talla'],
        Image: firstImage || '',
        Brand: raw['Marca'],
        Family: raw['Linea'],
      };
    });
    
    const grouped: Record<string, CsvRowRollerblade[]> = {};
    for (const row of csvRows) {
      const skuRoot = row.idCode; // use 'Art. Codigo'
      if (!skuRoot) continue; // skip if missing
      if (!grouped[skuRoot]) grouped[skuRoot] = [];
      grouped[skuRoot].push(row);
    }

    const results = [];
    for (const [skuRoot, rows] of Object.entries(grouped)) {
      const result = await processRollerbladeGroup(skuRoot, rows);
      results.push(result);
    }

    const successCount = results.filter(r => !r.errors || r.errors.length === 0).length;
    const failedGroups = results.filter(r => r.errors && r.errors.length > 0);

    res.json({
      message: 'Processed grouped Rollerblade products from FTP',
      totalGroups: results.length,
      successGroups: successCount,
      failedGroupsCount: failedGroups.length,
      successSkuRoots: results
        .filter(r => !r.errors || r.errors.length === 0)
        .map(r => r.skuRoot),
      errors: failedGroups.map(r => ({ skuRoot: r.skuRoot, errors: r.errors })),
      products: results,
    });

  } catch (err: any) {
    res.status(500).send('FTP Download or Processing failed: ' + err.message);
  }
};

export { downloadRollerbladeProductsCSV };
