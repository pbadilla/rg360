import { fetchRollerbladeCSV } from '@/services/importers/rollerblade/fetchRollerbladeCSV';
import { groupRollerbladeProducts } from '@/services/importers/rollerblade/groupRollerbladeProduct';
import { parseRollerbladeProducts } from '@/services/importers/rollerblade/parseRollerbladeProducts';
import { parseRollerbladeStock } from '@/services/importers/rollerblade/parseRollerbladeStock';
import { processRollerbladeGroup } from '@/utils/csv/processRollerbladeGroup';
import { transporter } from '@/utils/mailer';
import { Request, Response } from 'express';

export async function syncRollerbladeProducts(req: Request, res: Response) {
  try {
    const { PRODUCT_CSV, STOCK_CSV } = await fetchRollerbladeCSV();

    const stockMap = parseRollerbladeStock(STOCK_CSV);
    const productRows = parseRollerbladeProducts(PRODUCT_CSV, stockMap);
    const grouped = groupRollerbladeProducts(productRows);

    const results = [];
    const savedProducts: any[] = []; // <-- collect products here

    for (const [idCode, rows] of Object.entries(grouped)) {
      const result = await processRollerbladeGroup(idCode, rows);
      results.push({ idCode, ...result });
    
      if (result.success && result.product) {
        savedProducts.push(result.product);
      }
    }
    // --- Build email report ---
    const successCount = results.filter(r => r.success).length;
    const failedGroups = results.filter(r => !r.success).map(r => r.idCode);

    const productReport = savedProducts
      .map(p => `- ${p.reference}: stock ${p.stock}, price ${p.price?.pvp}`)
      .join("\n");

    await transporter.sendMail({
      from: '"Import Rollerblade Products" <no-reply@rollergrind360.com>',
      to: "ventas@rollergrind360.com",
      subject: "Rollerblade Import Finished ✅",
      text: `Sync finished.
      Total groups: ${results.length}
      Success: ${successCount}
      Failed groups: ${failedGroups.join(", ")}

      Products saved:
      ${productReport}`,
    });

    res.json({
      message: 'Rollerblade sync finished',
      totalGroups: results.length,
      successGroups: successCount,
      failedGroups,
      savedProducts,
    });
  } catch (err: any) {
    console.error("❌ Sync failed:", err);
    res.status(500).send("Sync failed: " + err.message);
  }
}
