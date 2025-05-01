import { ProductModel } from '@/models/product'; // Your Mongoose model
import { extractColor, extractCSizes } from '@/utils/parsers';

export async function productsUniverskateProcessing(row: Record<string, string>): Promise<void> {
  const csvreference = `US-${row["Reference"]}`;
  const csvean = row["Ean"];
  const csvprix = parseFloat(row["Prix"]);
  const csvstock = parseInt(row["Stock"], 10);
  const csvimage = row["Image"];
  const csvmarque = row["Marque"];
  const csvrefmere = row["Refmere"];
  const csvcolors = extractColor(row["Reference"]);
  const csvsizes = extractCSizes(row["Reference"]);

  const productDoc = new ProductModel({
    reference: csvreference,
    ean13: csvean,
    price: csvprix,
    stock: csvstock,
    images: [csvimage],
    brand: csvmarque,
    parentReference: csvrefmere,
    tags: [],
    colors: csvcolors,
    sizes: csvsizes,
    status: 'active',
    rating: 0,
    createdAt: new Date(),
    UpdateData: new Date(),
    name: `Product ${csvreference}`, // fallback name
  });

  try {
    await productDoc.save();
    console.log(`Inserted ${csvreference} into MongoDB`);
  } catch (err) {
    console.error(`Mongoose insert error for ${csvreference}:`, err);
  }
}
