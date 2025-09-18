import { fetchRollerbladeCSV } from '@/services/importers/rollerblade/fetchRollerbladeCSV';
import { groupRollerbladeProducts } from '@/services/importers/rollerblade/groupRollerbladeProduct';
import { parseRollerbladeProducts } from '@/services/importers/rollerblade/parseRollerbladeProducts';
import { parseRollerbladeStock } from '@/services/importers/rollerblade/parseRollerbladeStock';
import { processRollerbladeGroup } from '@/utils/csv/processRollerbladeGroup';
import { Request, Response } from 'express';

export async function syncRollerbladeProducts(req: Request, res: Response) {
  try {
    const { PRODUCT_CSV, STOCK_CSV } = await fetchRollerbladeCSV();

    const stockMap = parseRollerbladeStock(STOCK_CSV);
    const productRows = parseRollerbladeProducts(PRODUCT_CSV, stockMap);
    const grouped = groupRollerbladeProducts(productRows);

    const results = [];
    for (const [idCode, rows] of Object.entries(grouped)) {
      const result = await processRollerbladeGroup(idCode, rows);
      results.push({ idCode, ...result });
    }

    res.json({
      message: 'Rollerblade sync finished',
      totalGroups: results.length,
      successGroups: results.filter(r => r.success).length,
      failedGroups: results.filter(r => !r.success).map(r => r.idCode),
    });
  } catch (err: any) {
    console.error("❌ Sync failed:", err);
    res.status(500).send("Sync failed: " + err.message);
  }
}
