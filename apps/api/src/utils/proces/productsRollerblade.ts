import { ProductModel } from '@/models/product'; // Your Mongoose model
import { extractColor, extractCSizes } from '@/utils/parserUniverskate';

const mapCSVToProduct = (row: any) => {
  // Extract data from the CSV row based on the field names

    // 'Código Producto': '07103600 K47',

  const product = {
    csvBrand: row['Marca'], // 'ROLLERBLADE'
    csvcategory: undefined, // If you have a CategorySchema, map it here, otherwise leave it as undefined
    csvColors: [row['Descripción Color']], // 'WHITE' (assuming colors is an array)
    csvcreatedAt: new Date(), // Can use current date or another field
    csvDescription: row['Descripción Maestra'], // 'CASCO RB JR'
    csvEAN13: row['EAN / UPC'], // '8059791069002'
    csvImages: [], // Assuming no image URLs in the current data
    csvName: row['Descripción Maestra'], // 'CASCO RB JR'
    csvParentReference: row['Código Maestro'], // '86P065H020'
    csvPrice: {
      value: parseFloat(row['Coste'].replace(',', '.')), // '17,50' => 17.50
      currency: 'EUR', // Assuming EUR for now, or dynamically set
    },
    csvRating: 0, // Default rating, you can adjust this based on your logic
    csvReference: row['Código Producto'],
    csvRetailPrice: {
      value: parseFloat(row['PVPR'].replace(',', '.')), // '34,99' => 34.99
      currency: 'EUR', // Assuming EUR for now, or dynamically set
    },
    csvSizes: [], // No sizes specified in this example, but you can extract this if needed
    csvStatus: 'active', // Assuming active by default, you can change based on your data
    csvStock: parseInt(row['Stock'], 10), // '14' => 14
    csvTags: [], // You can add relevant tags if needed
    csvVariations: [], // You can add variations if applicable
    csvUpdateData: new Date(), // Current date
  };

  return product;
};


export async function productsRollerbladeProcessing(row: Record<string, string>): Promise<void> {
  
  const product = mapCSVToProduct(row);

  if (!product.csvEAN13) {
    console.warn(`❌ Skipping product ${product.csvReference} due to missing EAN13`);
    return;
  }

  const productDoc = new ProductModel({
    brand: product.csvBrand,
    category: 'extract the category', // TODO: Category
    colors: product.csvColors,
    createdAt: new Date(),
    description: product.csvDescription, // TODO: Description from IA
    ean13: !product.csvEAN13 ? undefined : product.csvEAN13,
    images: product.csvImages,
    name: `Product ${product.csvName}`,
    parentReference: product.csvParentReference,
    price: {
      pv: product.csvPrice.value,
      pvp: product.csvRetailPrice.value,
      benefit_percentage: ((product.csvRetailPrice.value - product.csvPrice.value) / product.csvRetailPrice.value) * 100,
    },
    rating: product.csvRating,
    reference: product.csvReference,
    sizes: product.csvSizes,
    status: product.csvStatus,
    stock: product.csvStock,
    tags: product.csvTags,
    variations: "extract the variations", // TODO: Variations
    updateData: product.csvUpdateData,
  });

  try {
    await productDoc.save();
    console.log(`Inserted ${product.csvReference} into MongoDB`);
  } catch (err) {
    console.error(`Mongoose insert error for ${product.csvReference}:`, err);
  }
}
