import fs from 'fs';

export function parseRollerbladeStock(stockFilePath: string): Map<string, number> {
  const stockCsv = fs.readFileSync(stockFilePath, 'utf-8');
  const lines = stockCsv.split('\n').filter(l => l.trim());

  const header = lines[0].split(';').map(h => h.trim().toLowerCase());
  const eanIndex = header.findIndex(h => h.includes('ean') || h.includes('upc'));
  const stockIndex = header.findIndex(h => h === 'stock');

  const stockMap = new Map<string, number>();
  for (const line of lines.slice(1)) {
    const cols = line.split(';');
    const ean = cols[eanIndex]?.trim();
    const stock = parseInt(cols[stockIndex] || '0', 10);
    if (ean) stockMap.set(ean, stock);
  }

  return stockMap;
}
