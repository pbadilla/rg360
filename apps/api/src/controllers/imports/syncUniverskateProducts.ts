import { Request, Response } from 'express';
import pLimit from 'p-limit';
import { fetchUniverskateCSV } from '@/services/importers/universkate/fetchUniverskateCSV';
import { groupByPrefix } from '@/services/importers/universkate/groupProduct';
import { compareWithDB } from '@/services/importers/universkate/compareWithDB';
import { saveProducts } from '@/services/importers/universkate/saveProducts';
import { GroupedProduct, ProductForDescription, Price } from '@/types/products';
import { getOrGenerateDescriptionAI } from '@/utils/csv/getOrGenerateDescriptionAI';
import { transporter } from '@/utils/mailer';

const CONCURRENCY_LIMIT = 5; // adjust based on your API limits
const limit = pLimit(CONCURRENCY_LIMIT);

export async function syncUniverskateProducts(req: Request, res: Response) {
  try {
    // 1️⃣ Fetch CSV
    const rows = await fetchUniverskateCSV();

    // 2️⃣ Group by family/prefix
    const grouped = groupByPrefix(rows);

    console.log("grouped", grouped);

    // 3️⃣ Compare with DB
    const { newProducts, updatedProducts, unchangedProducts } = await compareWithDB(grouped);

    // 4️⃣ Prepare products to enrich
    const toEnrich: GroupedProduct[] = [
      ...newProducts
        .map(diff => grouped.find(p => p.reference === diff.reference))
        .filter((p): p is GroupedProduct => Boolean(p)),
      ...updatedProducts
        .map(diff => grouped.find(p => p.reference === diff.reference))
        .filter((p): p is GroupedProduct => Boolean(p)),
    ];

  // 5️⃣ Generate AI descriptions in parallel with concurrency control
  await Promise.all(
    toEnrich.map(product =>
      limit(async () => {
        // Skip AI if product already has a description
        const diffSummary = [...newProducts, ...updatedProducts].find(d => d.reference === product.reference);
        if (diffSummary?.hasDescriptionInDB) {
          // already has DB or JSON description
          return;
        }

        const productForAI: ProductForDescription = {
          reference: product.reference,
          brand: product.brand,
          colors: product.colors,
          sizes: product.sizes,
          ean13: product.ean13,
          price: {
            pvp: product.price?.pvp ?? 0,
            pv: product.price?.pv ?? 0,
            benefit_percentage: product.price?.benefit_percentage ?? 0,
          },
              stock: product.stock ?? 0,
            };

            product.description = await getOrGenerateDescriptionAI(
              product.reference,
              product.description,
              productForAI
            );
          })
        )
      );

      // 6️⃣ Save enriched products back to DB
      await saveProducts(toEnrich);

      // 7️⃣ Send email notification
      const summary = {
        new: newProducts.length,
        updated: updatedProducts.length,
        unchanged: unchangedProducts.length,
      };

      // Build a readable change list
      const changesReport = `
      New products:
      ${newProducts.map(p => `- ${p.reference}`).join("\n")}

      Updated products:
      ${updatedProducts.map(
        p => `- ${p.reference}: stock ${p.oldStock} → ${p.newStock}, price ${p.oldPrice} → ${p.newPrice}`
      ).join("\n")}
      `;

    await transporter.sendMail({
      from: '"Import Universkate Products" <no-reply@rollergrind360.com>',
      to: "ventas@rollergrind360.com",
      subject: "Universkate Import Finished ✅",
      text: `Sync finished.
      New: ${summary.new}, Updated: ${summary.updated}, Unchanged: ${summary.unchanged}
      
      Details:
      ${changesReport}`,
    });

    // 8️⃣ Return summary
    res.json({
      message: "Universkate sync finished",
      ...summary,
    });
  } catch (err) {
    console.error("❌ Sync failed:", err);
    res.status(500).send("Sync failed: " + (err as Error).message);
  }
}
