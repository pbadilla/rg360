// services/compareWithDB.ts
import { ProductModel } from '@/models/product';
import { GroupedProduct } from '@/types/products';
import isEqual from 'lodash/isEqual';
import fs from 'fs';
import path from 'path';

type DiffSummary = {
  reference: string;
  descriptionInCSV?: string;
  categoryInCSV?: string;
  variationSummary: {
    sizes: string[];
    colors: string[];
  };
  hasDescriptionInDB: boolean;
  hasCategoryInDB: boolean;
  diffs: string[];
};

export async function compareWithDB(grouped: GroupedProduct[], saveToFile = true) {
  const references = grouped.map(g => g.reference);

  // Fetch products from DB
  const dbProducts = await ProductModel.find({ reference: { $in: references } }).lean();
  const dbMap = new Map(dbProducts.map(p => [p.reference, p]));

  const newProducts: DiffSummary[] = [];
  const updatedProducts: DiffSummary[] = [];
  const unchangedProducts: DiffSummary[] = [];

  for (const product of grouped) {
    const dbProduct = dbMap.get(product.reference);

    // Case: New product (not in DB)
    if (!dbProduct) {
      newProducts.push({
        reference: product.reference,
        descriptionInCSV: product.description ?? '',
        categoryInCSV: product.category ?? '',
        variationSummary: {
          sizes: product.sizes || [],
          colors: product.colors || [],
        },
        hasDescriptionInDB: false,
        hasCategoryInDB: false,
        diffs: ['newProduct'],
      });
      continue;
    }

    // Compare with DB product
    const diffs: string[] = [];

    if (dbProduct.name !== product.name) diffs.push('name');
    if (dbProduct.brand !== product.brand) diffs.push('brand');
    if (dbProduct.stock !== product.stock) diffs.push('stock');
    if (dbProduct.description !== product.description) diffs.push('description');
    if (dbProduct.category !== product.category) diffs.push('category');

    if (!isEqual(dbProduct.price, product.price)) diffs.push('price');
    if (!isEqual(dbProduct.images, product.images)) diffs.push('images');
    if (!isEqual(dbProduct.variations, product.variations)) diffs.push('variations');

    const summary: DiffSummary = {
      reference: product.reference,
      descriptionInCSV: product.description ?? '',
      categoryInCSV: product.category ?? '',
      variationSummary: {
        sizes: product.sizes || [],
        colors: product.colors || [],
      },
      hasDescriptionInDB: Boolean(dbProduct.description),
      hasCategoryInDB: Boolean(dbProduct.category),
      diffs,
    };

    if (diffs.length > 0) {
      updatedProducts.push(summary);
    } else {
      unchangedProducts.push(summary);
    }
  }

  const result = { newProducts, updatedProducts, unchangedProducts };

  // Save JSON report to file
  if (saveToFile) {
    const filePath = path.resolve(process.cwd(), 'compareResults.json');
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`Comparison results saved to ${filePath}`);
  }

  return result;
}
