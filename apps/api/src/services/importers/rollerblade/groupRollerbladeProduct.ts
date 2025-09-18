import { CsvRowRollerblade } from '@/types/products';

export function groupRollerbladeProducts(rows: CsvRowRollerblade[]): Record<string, CsvRowRollerblade[]> {
  return rows.reduce((acc, row) => {
    const idCode = row.idCode;
    if (!idCode) return acc;
    if (!acc[idCode]) acc[idCode] = [];
    acc[idCode].push(row);
    return acc;
  }, {} as Record<string, CsvRowRollerblade[]>);
}
