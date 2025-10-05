import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import { ProductModel } from "@/models/product";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type EnrichmentDoc = {
  id_product?: number;
  ean13: string;
  reference?: string;
  price?: number;
  active?: number;
  nombre_producto?: string;
  descripcion_larga?: string;
  descripcion_corta?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  categorias?: string[];
  image?: string;
  variations?: any[];
};

export async function enrichBBDDFromJSON(
  wss: WebSocketServer,
  batchSize = 500
) {
  // 1️⃣ Load JSON and build a Map for fast lookup
  const filePath = path.resolve(__dirname, "../data/json/with_description.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const jsonDocs: EnrichmentDoc[] = JSON.parse(raw);
  const enrichmentMap = new Map(jsonDocs.map((doc) => [doc.ean13, doc]));

  // 2️⃣ Count total products in MongoDB
  const totalProducts = await ProductModel.countDocuments({});
  const totalPages = Math.ceil(totalProducts / batchSize);

  console.log(`[Enrich] Found ${totalProducts} products, processing in ${totalPages} batches`);

  const updated: EnrichmentDoc[] = [];
  const notFound: EnrichmentDoc[] = [];

  // 3️⃣ Process products in batches
  for (let page = 1; page <= totalPages; page++) {
    const products = await ProductModel.find({})
      .skip((page - 1) * batchSize)
      .limit(batchSize)
      .lean();

    console.log(`[Enrich] Batch ${page}/${totalPages} -> ${products.length} products`);

    // Optional: group by brand for reporting
    const productsByBrand = products.reduce((acc: any, product) => {
      const brand = product.brand || "Unknown";
      if (!acc[brand]) acc[brand] = [];
      acc[brand].push(product);
      return acc;
    }, {});

    for (const [brand, items] of Object.entries(productsByBrand)) {
      if (!Array.isArray(items)) {
        console.warn(`[Enrich] Skipping brand=${brand} because items is not an array`);
        continue;
      }
      console.log(`[Enrich] Processing brand=${brand} with ${items.length} products`);

      for (const product of items as any[]) {
        const doc = enrichmentMap.get(product.ean13);

        if (!doc) {
          notFound.push(product);
          continue;
        }

        // 4️⃣ Build update object with proper mapping
        const enrichmentUpdate: any = {
          ...(doc.nombre_producto && { name: doc.nombre_producto }),
          ...(doc.descripcion_larga && { description: doc.descripcion_larga }),
          ...(doc.descripcion_corta && { short_description: doc.descripcion_corta }),
          ...(doc.meta_description && { meta_description: doc.meta_description }),
          ...(doc.reference && { reference: doc.reference }),
          ...(typeof doc.active !== "undefined" && {
            status: doc.active === 1 ? "active" : "inactive",
          }),
          ...(doc.price && { "price.pvp": doc.price }),
          ...(doc.categorias &&
            doc.categorias.length > 0 && { "category.name": doc.categorias[0] }),
        };

        // Deduplicate arrays
        if (doc.image) {
          enrichmentUpdate.$addToSet = {
            ...(enrichmentUpdate.$addToSet || {}),
            images: doc.image,
          };
        }

        if (doc.variations && doc.variations.length > 0) {
          enrichmentUpdate.$addToSet = {
            ...(enrichmentUpdate.$addToSet || {}),
            variations: { $each: doc.variations },
          };
        }

        // 5️⃣ Update MongoDB
        const result = await ProductModel.findOneAndUpdate(
          { ean13: product.ean13 },
          enrichmentUpdate,
          { upsert: false, new: true }
        );

        const percent = (((page - 1) * batchSize + 1) / totalProducts * 100).toFixed(2);

        if (result) {
          updated.push(doc);
          console.log(
            `[Enrich] (${percent}%) ✅ Updated ean13=${doc.ean13}`
          );
        } else {
          notFound.push(doc);
          console.log(
            `[Enrich] (${percent}%) ❌ Not Found ean13=${doc.ean13}`
          );
        }

        // Optional: WebSocket broadcast
        wss.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(
              JSON.stringify({
                type: "progress",
                current: page,
                total: totalPages,
                percent,
                ean13: doc.ean13,
                status: result ? "updated" : "not_found",
              })
            );
          }
        });
      }
    }
  }

  // 6️⃣ Write reports
  const outDir = path.resolve(__dirname, "../data/output");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, "updated.json"), JSON.stringify(updated, null, 2));
  fs.writeFileSync(path.join(outDir, "not_found.json"), JSON.stringify(notFound, null, 2));

  console.log("[Enrich] 🎉 Completed enrichment of all products");
  console.log(`[Enrich] ✅ Updated: ${updated.length} | ❌ Not Found: ${notFound.length}`);
  console.log(`[Enrich] JSON reports written to ${outDir}`);
}
