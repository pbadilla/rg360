import { GroupedProduct, ProductDoc } from '@/types/products';

/**
 * Convert a grouped product to a MongoDB document format
 */
export function groupedProductToMongoDoc(groupedProduct: GroupedProduct): ProductDoc {
  return {
    name: groupedProduct.name,
    description: groupedProduct.description || '',
    reference: groupedProduct.reference,
    ean13: groupedProduct.ean13,
    brand: groupedProduct.brand,
    weight: 0, // Default weight, should be calculated from variations if available
    price: groupedProduct.price,
    stock: groupedProduct.stock,
    status: 'active',
    category: {
      code: groupedProduct.category || 'general',
      name: groupedProduct.category || 'General'
    },
    variations: groupedProduct.variations,
    colors: groupedProduct.colors,
    sizes: groupedProduct.sizes,
    images: groupedProduct.images,
    parentReference: groupedProduct.skuRoot
  };
}

/**
 * Convert multiple grouped products to MongoDB documents
 */
export function groupedProductsToMongoDocs(groupedProducts: GroupedProduct[]): ProductDoc[] {
  return groupedProducts.map(groupedProductToMongoDoc);
}