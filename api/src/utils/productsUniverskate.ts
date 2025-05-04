import { ProductModel } from '@/models/product'; // Your Mongoose model
import { extractColor, extractCSizes } from '@/utils/parserUniverskate';

export async function productsUniverskateProcessing(row: Record<string, string>): Promise<void> {

  // console.log("Row >>", row);

  const rawReference = row['PRODUCT REF'];
  const csvReference = `US-${rawReference}`;
  const csvEAN13 = row['EAN13 CODE'];
  const csvPrix = parseFloat(row['PURCHASE PRICE'] || '0');
  const csvRetailPrice = parseFloat(row['RETAIL PRICE'] || '0');
  const csvStock = parseInt(row['AVAILABLE STOCK'] || '0', 10);
  const csvImage = row['PICTURES'];
  const csvBrand = row['BRAND'];
  const csvRefMother = row['MOTHER REF'];
  const csvDescription = row['PRODUCT DESCRIPTION'] || '';
  const csvColors = extractColor(rawReference);
  const csvSizes = extractCSizes(rawReference);

  // Basic validation
  if (!row["PURCHASE PRICE"] || isNaN(csvPrix)) {
    console.warn(`Skipping ${csvReference}: Invalid or missing price`);
    return;
  }

  if (!row["AVAILABLE STOCK"] || isNaN(csvStock)) {
    console.warn(`Skipping ${csvReference}: Invalid or missing stock`);
    return;
  }

  if (!csvEAN13) {
    console.warn(`Skipping ${csvReference}: Missing EAN13`);
    return;
  }

  // Calculate the benefit percentage
  const csvBenefitPercentage = csvRetailPrice > 0
  ? Math.round(((csvRetailPrice - csvPrix) / csvRetailPrice) * 100)
  : 0;

  const productDoc = new ProductModel({
    brand: csvBrand,
    category: 'extract the category', // TODO: Category
    colors: csvColors,
    createdAt: new Date(),
    description: csvDescription, // TODO: Description from IA
    ean13: csvEAN13,
    images: [csvImage],
    name: `Product ${csvReference}`,
    parentReference: csvRefMother,
    price: {
      pv: csvPrix,
      pvp: csvRetailPrice,
      benefit_percentage: csvBenefitPercentage,
    },
    rating: 0,
    reference: csvReference,
    sizes: csvSizes,
    status: csvStock > 0 ? 'active' : 'inactive',
    stock: csvStock,
    tags: [],
    variations: "extract the variations", // TODO: Variations
    updateData: new Date(),
  });

  try {
    await productDoc.save();
    console.log(`Inserted ${csvReference} into MongoDB`);
  } catch (err) {
    console.error(`Mongoose insert error for ${csvReference}:`, err);
  }
}
