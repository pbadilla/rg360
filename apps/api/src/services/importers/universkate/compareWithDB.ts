// services/compareWithDB.ts
import { ProductModel } from '@/models/product';
import { GroupedProduct } from '@/types/products';

export async function compareWithDB(grouped: GroupedProduct[]) {
  const references = grouped.map(g => g.reference);
  const dbProducts = await ProductModel.find({ reference: { $in: references } }).lean();
  const dbMap = new Map(dbProducts.map(p => [p.reference, p]));

  const newProducts: GroupedProduct[] = [];
  const updatedProducts: GroupedProduct[] = [];
  const unchangedProducts: GroupedProduct[] = [];

  for (const product of grouped) {
    const dbProduct = dbMap.get(product.reference);

    if (!dbProduct) {
      newProducts.push(product);
      continue;
    }

    // simple diff check
    const diffs: string[] = [];
    if (dbProduct.name !== product.name) diffs.push('name');
    if (dbProduct.brand !== product.brand) diffs.push('brand');
    if (dbProduct.stock !== product.stock) diffs.push('stock');

    if (diffs.length > 0) updatedProducts.push(product);
    else unchangedProducts.push(product);
  }

  return { newProducts, updatedProducts, unchangedProducts };
}
