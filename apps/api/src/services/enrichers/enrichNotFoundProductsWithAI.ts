import fs from 'fs';
import path from 'path';
import { wss } from 'src/websocket';
import { AIDescription } from '@/services/enrichers/AIDescription';
import { ProductModel } from '@/models/product';
import { fileURLToPath } from 'url';

// ESM replacement for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Optional: concurrency limit for batch processing
const CONCURRENT_LIMIT = 5;

export async function enrichNotFoundProductsWithAI() {
  const notFoundPath = path.resolve(__dirname, '../data/output/not_found.json');
  if (!fs.existsSync(notFoundPath)) throw new Error("not_found.json not found");

  const raw = fs.readFileSync(notFoundPath, 'utf-8');
  const products = JSON.parse(raw);

  const updatedProducts: any[] = [];

  console.log(`Starting AI enrichment for ${products.length} products...`);

  // Simple concurrency batching
  const batches = [];
  for (let i = 0; i < products.length; i += CONCURRENT_LIMIT) {
    batches.push(products.slice(i, i + CONCURRENT_LIMIT));
  }

  for (const batch of batches) {
    await Promise.all(
      batch.map(async (product: any) => {
        try {
          let aiData;
          let attempts = 0;
          const maxAttempts = 2;

          // Retry loop for transient AI failures
          while (attempts < maxAttempts) {
            attempts++;
            try {
              aiData = await AIDescription(product);
              break; // success
            } catch (err: any) {
              console.warn(`Attempt ${attempts} failed for ean13=${product.ean13}: ${err.message}`);
              if (attempts >= maxAttempts) throw err;
            }
          }

          // Update MongoDB
          await ProductModel.updateOne(
            { ean13: product.ean13 },
            {
              name: aiData.name,
              description: aiData.description,
              attributes: aiData.attributes,
              categories: aiData.categories,
            }
          );

          updatedProducts.push({ ean13: product.ean13, ...aiData });

          // Stream progress via WebSocket
          wss.clients.forEach((client) => {
            if (client.readyState === 1) {
              client.send(JSON.stringify({
                type: 'ai-progress',
                ean13: product.ean13,
                status: 'updated',
              }));
            }
          });

          console.log(`✅ AI enriched product ean13=${product.ean13}`);

        } catch (err: any) {
          console.error(`❌ Failed AI enrichment for ean13=${product.ean13}: ${err.message}`);

          // Send failed status via WebSocket
          wss.clients.forEach((client) => {
            if (client.readyState === 1) {
              client.send(JSON.stringify({
                type: 'ai-progress',
                ean13: product.ean13,
                status: 'failed',
                error: err.message,
              }));
            }
          });
        }
      })
    );
  }

  // Save updated AI descriptions
  const outDir = path.resolve(__dirname, '../data/output');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, 'ai_updated.json'), JSON.stringify(updatedProducts, null, 2));

  console.log(`AI enrichment completed. Total products: ${products.length}, Updated: ${updatedProducts.length}`);

  return { total: products.length, updated: updatedProducts.length };
}
