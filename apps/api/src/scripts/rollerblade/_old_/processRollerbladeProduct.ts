import { ProductModel } from '@/models/product';
import { extractColor, extractCSizes } from '@/utils/parserUniverskate';
import { CsvRow, Variation, ProductDoc, Price } from '@/types/products';

export async function processRollerbladeProduct(row: CsvRow): Promise<void> {
  const sku = row.Reference;
  const skuRoot = row.Family;
  const productReference = `US-${sku}`;
  const ean = row.EAN;
  const stockValue = typeof row.Stock === 'string' ? row.Stock : String(row.Stock || '0');
  const stock = parseInt(stockValue, 10);
  
  let priceValue = 0;
  if (row.Price) {
    if (typeof row.Price === 'object') {
      priceValue = row.Price.pvp || 0;
    } else {
      priceValue = parseFloat(String(row.Price));
    }
  }
  
  const image = row.Image;
  const brand = row.Brand;
  const name = row.Name;
  const weight = parseFloat(row.Weight || '0');
  const color = sku ? extractColor(sku) || '' : '';
  const sizes = sku ? extractCSizes(sku) || [] : [];

  // Validate required fields
  if (!sku || !ean || !brand || !name || !skuRoot || isNaN(priceValue) || isNaN(stock)) {
    console.warn(`Skipping ${productReference}: missing required data`);
    return;
  }

  const priceObject: Price = {
    pvp: priceValue,
    pv: priceValue * 0.8, // Example calculation
    benefit_percentage: 20
  };

  const variation: Variation = {
    sku,
    ean,
    size: sizes[0] || '',
    color,
    stock,
    price: priceObject,
    image,
  };
  
  const productData: ProductDoc = {
    reference: sku,
    ean13: ean,
    name,
    brand,
    colors: [color],
    sizes,
    price: priceObject,
    stock,
    image,
    description: `${brand} ${name}`,
    weight,
    status: 'active',
    category: {
      code: skuRoot,
      name: skuRoot,
    },
    variations: [variation],
  };
  try {
    await ProductModel.create(productData);
    console.log(`Inserted ${productReference} into MongoDB`);
  } catch (error) {
    console.error(`Error inserting ${productReference} into MongoDB:`, error);
  }
}
