// services/getOrGenerateDescriptionAI.ts
import { ProductModel } from "@/models/product";
import { ProductForDescription } from "@/types/products";
import { AIDescription } from "@/services/AIDescription";

/**
 * Returns description from CSV, DB, or AI fallback.
 */
export async function getOrGenerateDescriptionAI(
  reference: string,
  csvDescription: string | undefined,
  productForAI: ProductForDescription
): Promise<string> {
  // 1. CSV description first
  if (csvDescription && csvDescription.trim()) return csvDescription.trim();

  // 2. DB existing description
  const existingProduct = await ProductModel.findOne({ reference }, { description: 1 }).lean() as { description?: string } | null;
  if (existingProduct?.description?.trim()) return existingProduct.description.trim();

  // 3. AI generation fallback
  try {
    return await AIDescription(productForAI);
  } catch (err) {
    console.error(`❌ Failed to generate AI description for ${reference}:`, err);
    return `Premium ${productForAI.brand ?? "Unknown"} ${productForAI.reference} with excellent quality and design.`;
  }
}
