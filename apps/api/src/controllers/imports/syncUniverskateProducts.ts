// controllers/universkateController.ts
import { Request, Response } from 'express';
import { fetchUniverskateCSV } from '@/services/importers/universkate/fetchUniverskateCSV';
import { groupByPrefix } from '@/services/importers/universkate/groupProduct';
import { compareWithDB } from '@/services/importers/universkate/compareWithDB';
import { enrichProducts } from '@/services/importers/universkate/enrichProducts';
import { saveProducts } from '@/services/importers/universkate/saveProducts';

export async function syncUniverskateProducts(req: Request, res: Response) {
  try {
    const rows = await fetchUniverskateCSV();
    const grouped = groupByPrefix(rows);

    const { newProducts, updatedProducts, unchangedProducts } = await compareWithDB(grouped);

    // only enrich new + updated
    const enriched = await enrichProducts([...newProducts, ...updatedProducts]);

    // save back to DB
    await saveProducts(enriched);

    res.json({
      message: 'Universkate sync finished',
      new: newProducts.length,
      updated: updatedProducts.length,
      unchanged: unchangedProducts.length,
    });
  } catch (err) {
    console.error('Sync failed:', err);
    res.status(500).send('Sync failed: ' + (err as Error).message);
  }
}
