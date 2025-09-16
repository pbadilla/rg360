// services/saveProducts.ts
import { ProductModel } from '@/models/product';
import { GroupedProduct } from '@/types/products';

export async function saveProducts(products: GroupedProduct[]) {
  for (const product of products) {
    await ProductModel.findOneAndUpdate(
      { parentReference: product.skuRoot },
      { $set: product },
      { upsert: true, new: true }
    );
  }
}
