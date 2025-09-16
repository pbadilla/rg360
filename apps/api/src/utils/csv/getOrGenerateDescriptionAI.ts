import { ProductModel } from '@/models/product';
import { ProductForDescription } from '@/types/products';
import { AIDescription } from '@/services/AIDescription';

/**
 * Returns an existing description from DB, CSV, or generates via AI if missing.
 */
export async function getOrGenerateDescriptionAI(
  reference: string,
  csvDescription: string | undefined,
  productForAI: ProductForDescription
): Promise<string> {
  // 1. Use CSV description if present
  if (csvDescription && csvDescription.trim()) {
    return csvDescription.trim();
  }

  // 2. Check MongoDB for existing description
  const existingProduct = await ProductModel.findOne(
    { reference },
    { description: 1 }
  ).lean() as { description?: string } | null;

  if (existingProduct && typeof existingProduct.description === 'string' && existingProduct.description.trim()) {
    return existingProduct.description.trim();
  }

  // 3. Otherwise, generate AI description
  try {
    const aiDesc = await AIDescription(productForAI);
    return aiDesc;
  } catch (err) {
    console.error(`❌ Failed to generate AI description for ${reference}:`, err);
    return `Premium ${productForAI.brand} ${productForAI.reference} with excellent quality and design.`;
  }
}
