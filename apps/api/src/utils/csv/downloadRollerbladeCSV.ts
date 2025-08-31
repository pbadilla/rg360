import fs from 'fs';
import ftp from 'basic-ftp';
import { Request, Response } from 'express';

import { CsvRowRollerblade } from '@/types/products';
import { processRollerbladeGroup } from './processRollerbladeGroup';

const PRODUCT_CSV = './rollerbladeProducts.csv';
const STOCK_CSV = './rollerbladeStock.csv';

function parseStockCSV(stockFilePath: string): Map<string, number> {
  const stockCsv = fs.readFileSync(stockFilePath, 'utf-8');
  const lines = stockCsv.split('\n').filter(l => l.trim());

  if (lines.length < 2) {
    throw new Error('Stock CSV has no data rows');
  }

  const header = lines[0].split(';').map(h => h.trim());
  const normalizedHeader = header.map(h => h.toLowerCase().replace(/\s+/g, ''));

  const eanIndex = normalizedHeader.findIndex(h => h.includes('ean') || h.includes('upc') || h.includes('an'));
  const stockIndex = normalizedHeader.findIndex(h => h === 'stock');

  if (eanIndex === -1 || stockIndex === -1) {
    throw new Error(`Could not find EAN or Stock columns in stock CSV. Got headers: ${normalizedHeader}`);
  }

  const stockMap = new Map<string, number>();

  for (const line of lines.slice(1)) {
    const cols = line.split(';');
    const ean = cols[eanIndex]?.trim();
    const stockStr = cols[stockIndex]?.trim();
    const stock = parseInt(stockStr || '0', 10);

    if (ean) {
      stockMap.set(ean, stock);
    }
  }

  return stockMap;
}

const downloadRollerbladeCSV = async (req: Request, res: Response): Promise<void> => {
  const ftpOptions = {
    host: "ftp.bmsportech.com",
    user: "cliente_rollergrind360",
    password: "aue9kpr@DPV.hgp7ufz",
    port: 21,
    secure: true,
    secureOptions: {
      rejectUnauthorized: false,
    },
  };

  const remoteProductFile = "./pricats/Pricat_ss25_rollerblade.csv";
  const remoteStockFile = "./stocks.csv";

  try {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    await client.access(ftpOptions);
    await client.downloadTo(PRODUCT_CSV, remoteProductFile);
    await client.downloadTo(STOCK_CSV, remoteStockFile);
    client.close();

    // Parse stock CSV
    const stockMap = parseStockCSV(STOCK_CSV);

    // Parse product CSV
    const productLines = fs.readFileSync(PRODUCT_CSV, 'utf-8').split('\n').filter(l => l.trim());
  
    // -- parse header
    let rawHeader = productLines[0];
    if (rawHeader.charCodeAt(0) === 0xfeff) {
      rawHeader = rawHeader.slice(1);
    }
    const delimiter = rawHeader.includes('\t') ? '\t' : ';';
    const headers = rawHeader.split(delimiter).map(h => h.trim());
    const dataRows = productLines.slice(1);

    // -- parse data
    const rawRows = dataRows.map(line => {
      const values = line.split(delimiter);
      if (values.length !== headers.length) {
        console.warn(`Skipping line: mismatch in number of columns`, line);
        return null;
      }

      const raw: Record<string, string> = {};
      headers.forEach((key, index) => {
        raw[key] = values[index]?.trim() || '';
      });

      console.log('Mapped row:', raw); // debug

      const imageKeys = ['Foto', 'Foto2', 'Foto3', 'Foto4', 'Foto5'];
      const firstImage = imageKeys.map(k => raw[k]).find(url => url?.startsWith('http'));

      const ean = raw['EAN'];
      const stock = stockMap.get(ean) ?? 0;

      return {
        EAN: ean,
        Reference: raw['SKU'],
        idCode: raw['Art. Codigo'],
        Name: raw['Art. Nombre'],
        ColorNombre: raw['Color Nombre'],
        ColorBase: raw['Color Base'],
        ColorCodigo: raw['Color Codigo'],
        Size: raw['Talla'],
        Image: firstImage || '',
        Brand: raw['Marca'],
        Family: raw['Linea'],
        Stock: stock.toString(),
        Price: raw['PVPR'] ?? '0',
        Weight: '0',
      };
    });

    const productRows = rawRows.filter(Boolean) as CsvRowRollerblade[];

    // Group rows by idCode (product root)
    const grouped: Record<string, CsvRowRollerblade[]> = {};
    for (const row of productRows) {
      const idCode = row.idCode;
      if (!idCode) continue;
      if (!grouped[idCode]) grouped[idCode] = [];
      grouped[idCode].push(row);
    }

    const results = [];
    for (const [idCode, rows] of Object.entries(grouped)) {
      const result = await processRollerbladeGroup(idCode, rows);
      results.push({ idCode, ...result });
    }

    const successCount = results.filter(r => r.success).length;
    const failedGroups = results.filter(r => !r.success);

    res.json({
      message: 'Processed merged Rollerblade product and stock data',
      totalGroups: results.length,
      successGroups: successCount,
      failedGroupsCount: failedGroups.length,
      products: results,
    });

  } catch (err: any) {
    console.error(err);
    res.status(500).send('FTP Download or Processing failed: ' + err.message);
  }
};

export { downloadRollerbladeCSV };
