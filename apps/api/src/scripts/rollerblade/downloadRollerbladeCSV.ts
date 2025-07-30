import fs from 'fs';
import { Request, Response } from 'express';
import { removeFirstRow } from '@/utils/removeFirstRow';
import { CsvRow } from '@/types/csvUniverskate';
import { processRollerbladeGroup } from './processRollerbladeGroup';
import ftp from 'basic-ftp';
import tls from 'tls';

const downloadRollerbladeCSV = async (req: Request, res: Response): Promise<void> => {
  const path = './rollerblade.csv';
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

  const remoteFilePath = "./stocks.csv"; // ← UPDATE with the correct remote path

  try {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    await client.access(ftpOptions);
    await client.downloadTo(path, remoteFilePath);
    client.close();

    removeFirstRow(path);
    const csvData = fs.readFileSync(path, 'utf-8');

    const lines = csvData
      .split('\n')
      .filter(line => line.trim().length > 0);

    const headers = lines[0].split('\t');
    const dataRows = lines.slice(1);

    const csvRows: CsvRow[] = dataRows.map(line => {
      const values = line.split(';');
      const raw: any = {};
      headers.forEach((key, index) => {
        raw[key] = values[index]?.trim() || '';
      });

      return {
        Reference: raw['Código Completo (SKU)'],
        EAN: raw['EAN / UPC'],
        Price: raw['PVPR'],
        Stock: raw['Stock'],
        Name: `${raw['Descripción Maestra']} ${raw['Descripción Color']}`,
        Image: '', // No image URL provided in your CSV
        Brand: raw['Marca'],
        Family: raw['Código Maestro'],
        Weight: '0', // fallback
      };

    });

    const grouped: Record<string, CsvRow[]> = {};
    for (const row of csvRows) {
      if (!grouped[row.Family]) grouped[row.Family] = [];
      grouped[row.Family].push(row);
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

export { downloadRollerbladeCSV };
