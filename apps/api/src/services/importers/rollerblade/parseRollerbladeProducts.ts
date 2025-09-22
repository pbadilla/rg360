import { Price, CsvRowRollerblade } from '@/types/products';
import { formatPriceForMongoDB } from '@/utils/prices';

import * as fs from 'fs';

export function parseRollerbladeProducts(productFilePath: string, stockMap: Map<string, number>): CsvRowRollerblade[] {
  const lines = fs.readFileSync(productFilePath, 'utf-8').split('\n').filter((l: string) => l.trim());

  let rawHeader = lines[0];
  if (rawHeader.charCodeAt(0) === 0xfeff) rawHeader = rawHeader.slice(1);

  const delimiter = rawHeader.includes('\t') ? '\t' : ';';
  const headers = rawHeader.split(delimiter).map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(delimiter);
    if (values.length !== headers.length) return null;

    const raw: Record<string, string> = {};
    headers.forEach((key, idx) => raw[key] = values[idx]?.trim() || '');

    const ean = raw['EAN'];
    const stock = stockMap.get(ean) ?? 0;

    const imageKeys = ['Foto', 'Foto2', 'Foto3', 'Foto4', 'Foto5'];
    const firstImage = imageKeys.map(k => raw[k]).find(url => url?.startsWith('http'));

    // ✅ Convert PVPR into your Price object
    const rawPvpr = raw['PVPR'];
    let pvpr = formatPriceForMongoDB(rawPvpr);
    
    if (isNaN(pvpr)) {
      console.warn(`⚠️ Invalid PVPR value "${rawPvpr}" for product ${raw['Art. Codigo']}`);
      pvpr = 0;
    }
    
    const price: Price = {
      pvp: pvpr,
      pv: pvpr,
      benefit_percentage: 0,
    };

    return {
      ean13: ean,
      reference: raw['SKU'],
      description: raw['Descripcion larga'],
      idCode: raw['Art. Codigo'],
      name: raw['Art. Nombre'],
      colorNombre: raw['Color Nombre'],
      colorBase: raw['Color Base'],
      colorCodigo: raw['Color Codigo'],
      size: raw['Talla'],
      image: firstImage || '',
      brand: raw['Marca'],
      family: raw['Linea'],
      stock: stock,
      price: price,   // ✅ now matches interface
      weight: '0',
    };
  }).filter(Boolean) as CsvRowRollerblade[];
}
