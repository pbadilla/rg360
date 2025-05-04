import { ProductModel } from '@/models/product'; // Your Mongoose model
import { extractColor, extractCSizes } from '@/utils/parserUniverskate';

const mapCSVToProduct = (row: any) => {
  // Extract data from the CSV row based on the field names
  const product = {
    brand: row['Marca'], // 'ROLLERBLADE'
    category: undefined, // If you have a CategorySchema, map it here, otherwise leave it as undefined
    colors: [row['Descripción Color']], // 'WHITE' (assuming colors is an array)
    createdAt: new Date(), // Can use current date or another field
    description: row['Descripción Maestra'], // 'CASCO RB JR'
    ean13: row['EAN / UPC'], // '8059791069002'
    images: [], // Assuming no image URLs in the current data
    name: row['Descripción Maestra'], // 'CASCO RB JR'
    parentReference: row['Código Maestro'], // '86P065H020'
    price: {
      value: parseFloat(row['Coste'].replace(',', '.')), // '17,50' => 17.50
      currency: 'EUR', // Assuming EUR for now, or dynamically set
    },
    rating: 0, // Default rating, you can adjust this based on your logic
    reference: row['Código Producto'], // '86P065H020-A001'
    retailPrice: {
      value: parseFloat(row['PVPR'].replace(',', '.')), // '34,99' => 34.99
      currency: 'EUR', // Assuming EUR for now, or dynamically set
    },
    sizes: [], // No sizes specified in this example, but you can extract this if needed
    status: 'active', // Assuming active by default, you can change based on your data
    stock: parseInt(row['Stock'], 10), // '14' => 14
    tags: [], // You can add relevant tags if needed
    variations: [], // You can add variations if applicable
    updateData: new Date(), // Current date
  };

  return product;
};


export async function productsRollerbladeProcessing(row: Record<string, string>): Promise<void> {

  console.log("Row >>", row);

  const product = mapCSVToProduct(row);

  const productDoc = new ProductModel({
    brand: product.brand,
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
