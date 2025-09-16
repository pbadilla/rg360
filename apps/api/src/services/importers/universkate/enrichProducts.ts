// services/enrichProducts.ts
import { getOrGenerateDescriptionAI } from '@/utils/csv/getOrGenerateDescriptionAI';
import { GroupedProduct, ProductForDescription } from '@/types/products';

export async function enrichProducts(products: GroupedProduct[]) {
  return Promise.all(products.map(async product => {
    const productForAI: ProductForDescription = {
      brand: product.brand,
      reference: product.reference,
      ean13: product.ean13,
      colors: product.colors,
      sizes: product.sizes,
      price: product.price,
      stock: product.stock,
    };

    const description = await getOrGenerateDescriptionAI(
      product.reference,
      '', // fallback if no existing desc
      productForAI
    );

    return { ...product, description };
  }));
}
