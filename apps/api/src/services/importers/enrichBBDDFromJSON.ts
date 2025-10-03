import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

import { ProductModel } from "@/models/product";

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type EnrichmentDoc = {
  reference: string;
  brand?: string;
  category?: string;
  name?: string;
  image?: string;
  description?: string;
  short_description?: string;
  meta_description?: string;
  variations?: any[];
};

export async function enrichBBDDFromJSON( wss: WebSocketServer){
  const filePath = path.resolve(__dirname, "json/enrichUniverskateImport.json");

  const raw = fs.readFileSync(filePath, "utf-8");
  const jsonDocs: EnrichmentDoc[] = JSON.parse(raw);

const total = jsonDocs.length;
  let count = 0;

  for (const doc of jsonDocs) {
    count++;

    const enrichmentUpdate: any = {
      ...(doc.brand && { brand: doc.brand }),
      ...(doc.category && { "category.name": doc.category }),
      ...(doc.name && { name: doc.name }),
      ...(doc.image && { $addToSet: { images: doc.image } }),
      ...(doc.description && { description: doc.description }),
      ...(doc.short_description && { short_description: doc.short_description }),
      ...(doc.meta_description && { meta_description: doc.meta_description }),
    };

    if (doc.variations && doc.variations.length > 0) {
      enrichmentUpdate.$push = {
        ...(enrichmentUpdate.$push || {}),
        variations: { $each: doc.variations },
      };
    }

    const result = await ProductModel.findOneAndUpdate(
      { reference: doc.reference },
      enrichmentUpdate,
      { upsert: false, new: true }
    );

   // 👇 Add console log to track progress
    console.log(
      `[Enrich] (${count}/${total}) Updated reference=${doc.reference} -> ${result ? "OK" : "NOT FOUND"}`
    );
  }

  console.log("[Enrich] ✅ Completed enrichment of", total, "docs");
}
