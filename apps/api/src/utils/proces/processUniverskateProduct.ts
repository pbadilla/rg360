import { ProductModel } from '@/models/product'; // Your Mongoose model
import { extractColor, extractCSizes } from '@/utils/parserUniverskate';

export async function processUniverskateProduct(row: Record<string, string>): Promise<void> {
  const rawReference = row['PRODUCT REF'];
  const productReference = `US-${rawReference}`;
  const ean13Code = row['EAN13 CODE'];
  const purchasePrice = parseFloat(row['PURCHASE PRICE'] || '0');
  const retailPrice = parseFloat(row['RETAIL PRICE'] || '0');
  const availableStock = parseInt(row['AVAILABLE STOCK'] || '0', 10);
  const imageUrl = row['PICTURES'];
  const brand = row['BRAND'];
  const parentReference = row['MOTHER REF'];
  const description = row['PRODUCT DESCRIPTION'] || '';
  const colors = extractColor(rawReference);
  const sizes = extractCSizes(rawReference);

  // Basic validation
  if (!row["PURCHASE PRICE"] || isNaN(purchasePrice)) {
    console.warn(`Skipping ${productReference}: Invalid or missing purchase price`);
    return;
  }

  if (!row["AVAILABLE STOCK"] || isNaN(availableStock)) {
    console.warn(`Skipping ${productReference}: Invalid or missing stock`);
    return;
  }

  if (!ean13Code) {
    console.warn(`Skipping ${productReference}: Missing EAN13`);
    return;
  }

  // Calculate the benefit percentage
  const benefitPercentage = retailPrice > 0
    ? Math.round(((retailPrice - purchasePrice) / retailPrice) * 100)
    : 0;

  const productData = {
    brand,
    category: 'extract the category', // TODO: Implement category extraction
    colors,
    createdAt: new Date(),
    description, // TODO: Enhance description using AI or other method
    ean13: ean13Code,
    images: [imageUrl],
    name: `Product ${productReference}`,
    parentReference,
    price: {
      pv: purchasePrice,
      pvp: retailPrice,
      benefit_percentage: benefitPercentage,
    },
    rating: 0,
    reference: productReference,
    sizes,
    status: availableStock > 0 ? 'active' : 'inactive',
    stock: availableStock,
    tags: [],
    variations: "extract the variations", // TODO: Implement variations extraction
    updateData: new Date(),
  };

  try {
    // Insert the product document into MongoDB
    await ProductModel.create(productData);
    console.log(`Inserted ${productReference} into MongoDB`);
  } catch (error) {
    console.error(`Error inserting ${productReference} into MongoDB:`, error);
  }
}
