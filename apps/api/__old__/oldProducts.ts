import axios from 'axios';
import fs from 'fs';
import basicAuth from 'basic-auth-header';
import { Request, Response } from 'express';
import { removeFirstRow } from '@/utils/removeFirstRow';
import { CsvRow } from '@/types/products';
import { processUniverskateGroup } from './processUniverskateGroup';
import { formatPriceForMongoDB } from '@/utils/prices';

const downloadUniverskateCSV = async (req: Request, res: Response): Promise<void> => {
  const url = 'https://csvshops.universkate.com/UniverskateStock.csv';
  const path = './universkate.csv';
  const auth = basicAuth('csvuniverskate', 'ZeF1@TENbu');

  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: { Authorization: auth },
    });

    const writer = fs.createWriteStream(path);
    response.data.pipe(writer);

    writer.on('finish', async () => {
      try {
        removeFirstRow(path);
        const csvData = fs.readFileSync(path, 'utf-8');

        const lines = csvData
          .split('\n')
          .filter(line => line.trim().length > 0);

        const headers = lines[0].split(';').map(h => h.trim().replace(/\r/g, ''));
        const dataRows = lines.slice(1);

        const csvRows: CsvRow[] = dataRows.map(line => {
          const values = line.split(';');
          const raw: any = {};
          headers.forEach((key, index) => {
            raw[key] = values[index]?.trim() || '';
          });

          return {
            Reference: raw['PRODUCT REF'],
            ean13: raw['EAN13 CODE'],
            Price: formatPriceForMongoDB(raw['RETAIL PRICE']),
            Stock: raw['AVAILABLE STOCK'],
            Name: raw['PRODUCT DESCRIPTION'],
            Image: raw['PICTURES'],
            Brand: raw['BRAND'],
            Categories: raw['CATEGORIES'],
            Family: raw['MOTHER REF'],
            Weight: '0', // fallback
          };
        });

        // Group by Family
        // const row of csvRows.slice(0, 50/ v limite
        const grouped: Record<string, CsvRow[]> = {};
        for (const row of csvRows) {
          if (!grouped[row.Family]) grouped[row.Family] = [];
          grouped[row.Family].push(row);
        }

        const results = [];
        for (const [skuRoot, rows] of Object.entries(grouped)) {
          const result = await processUniverskateGroup(skuRoot, rows);
          results.push(result);
        }

        const successCount = results.filter(r => !r.errors || r.errors.length === 0).length;
        const failedGroups = results.filter(r => r.errors && r.errors.length > 0);

        res.json({
          message: 'Processed grouped Universkate products',
          totalGroups: results.length,
          successGroups: successCount,
          failedGroupsCount: failedGroups.length,
          successSkuRoots: results
            .filter(r => !r.errors || r.errors.length === 0)
            .map(r => r.skuRoot),
          errors: failedGroups.map(r => ({ skuRoot: r.skuRoot, errors: r.errors })),
          products: results,
        });
      } catch (err) {
        res.status(500).send('Processing failed: ' + (err as Error).message);
      }
    });

    writer.on('error', () => {
      res.status(500).send('Error writing file.');
    });
  } catch (err: any) {
    res.status(500).send('Download failed: ' + err.message);
  }
};

export { downloadUniverskateCSV };



import { ProductModel } from '@/models/product';
import { extractColor, extractCSizes } from '@/utils/proces/parserUniverskate';
import { CsvRow, Variation, ProductForDescription } from '@/types/products';
import { AIDescription } from '@/services/AIDescription';
import { formatPriceForMongoDB } from '@/utils/prices';

export async function processUniverskateGroup(
  skuRoot: string,
  rows: CsvRow[]
): Promise<any | null> {
  if (!rows.length) return null;

  const first = rows[0];

  const name = first.Name?.split(/Black|Blue|Red|Orange/i)[0]?.trim() || '';
  const brand = first.Brand;
  const weight = parseFloat(first.Weight || '0');

  // ------------------------------
  // Build variations
  // ------------------------------
  const variations: Variation[] = rows.map(row => {
    const sku = row.Reference;
    const ean = row.ean13;
    const stock = parseInt(row.Stock || '0', 10);
    const price = parseFloat(row.Price || '0');
    const image = row.Image || '';
    const color = extractColor(sku) || '';
    const sizes = extractCSizes(sku) || [];

    return {
      sku,
      ean,
      size: sizes[0] || '',
      color,
      stock,
      price,
      image,
    };
  });

  const colors = Array.from(new Set(variations.map(v => v.color).filter(Boolean)));
  const sizes = Array.from(new Set(variations.map(v => v.size).filter(Boolean)));

  // ------------------------------
  // Generate or use CSV description
  // ------------------------------
  let description = first.Description?.trim() || '';

  if (!description) {
    const productForAI: ProductForDescription = {
      brand,
      reference: first.Reference,
      ean13: first.ean13,
      colors,
      sizes,
      price: parseFloat(first.Price || '0'),
      stock: parseInt(first.Stock || '0', 10),
    };

    try {
      description = await AIDescription(productForAI); // ✅ Only the DTO
    } catch (err) {
      console.error(`❌ Failed to generate AI description for ${skuRoot}:`, err);
      description = `Premium ${brand} ${name} with excellent quality and design.`;
    }
  }

  // ------------------------------
  // Build full product document (align with Mongoose schema)
  // ------------------------------
  const priceNumber = parseFloat(first.Price || '0');
  const productData = {
    parentReference: skuRoot,
    reference: first.Reference,
    ean13: first.ean13,
    description,
    name,
    brand,
    weight,
    status: 'active',
    category: { code: skuRoot, name: skuRoot },
    colors,
    sizes,
    price: {
      pvp: priceNumber,
      pv: priceNumber,
      benefit_percentage: 0,
    },
    stock: parseInt(first.Stock || '0', 10),
    // The current Mongoose schema expects variations with nested size objects.
    // Until sizes mapping is finalized, store an empty array to avoid cast errors.
    variations: [] as unknown[],
    images: rows.map(r => r.Image).filter(Boolean) as string[],
  };

  // ------------------------------
  // Upsert into MongoDB
  // ------------------------------
  try {
    const doc = await ProductModel.findOneAndUpdate(
      { parentReference: skuRoot },
      { $set: productData },
      { upsert: true, new: true }
    );
    console.log(`Inserted/Updated grouped product ${skuRoot}`);
    return doc;
  } catch (err) {
    console.error(`Error upserting ${skuRoot}:`, err);
    return null;
  }
}


import { ProductModel } from '@/models/product';
import { CsvRowRollerblade, ProductDoc, Variation } from '@/types/products';

export async function processRollerbladeGroup(
  idCode: string,
  rows: CsvRowRollerblade[]
): Promise<{ success: boolean; message?: string }> {
  if (!rows.length) return { success: false, message: 'Empty group' };

  const first = rows[0];
  const productName = first.Name;
  const brand = first.Brand;
  const family = first.Family || '';
  const weight = parseFloat(first.Weight || '0');
  const description = first.Description || '';

  const variations: Variation[] = rows
    .filter(row => row.ean13 && row.Reference)
    .map(row => {
      const price = parseFloat(row.Price || '0');
      const stock = parseInt(row.Stock || '0', 10);
      const size = typeof row.Size === 'string' ? row.Size.trim() : '';
      const color = (row.ColorNombre || row.ColorBase || row.ColorCodigo || '').trim();
      const image = row.Image || '';

      return {
        sku: row.Reference,
        ean: row.ean13,
        price,
        stock,
        size,
        color,
        image,
      };
    });

  const uniqueSizes = Array.from(new Set(variations.map(v => v.size).filter(Boolean)));
  const uniqueColors = Array.from(new Set(variations.map(v => v.color).filter(Boolean)));

  const priceNumber = parseFloat(first.Price || '0');
  const product: any = {
    reference: idCode,
    parentReference: idCode,
    description, // <-- now defined
    ean13: first.ean13,
    name: productName,
    brand,
    weight,
    status: 'active',
    category: {
      code: idCode,
      name: family,
    },
    // Align with schema: store empty variations for now to avoid cast errors
    variations: [] as unknown[],
    sizes: uniqueSizes,
    colors: uniqueColors,
    price: {
      pvp: priceNumber,
      pv: priceNumber,
      benefit_percentage: 0,
    },
    stock: parseInt(first.Stock || '0', 10),
    images: rows.map(r => r.Image).filter(Boolean) as string[],
  };

  try {
    await ProductModel.updateOne(
      { reference: idCode },
      { $set: product },
      { upsert: true }
    );
    console.log(`Upserted grouped product ${idCode} with ${variations.length} variations`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to upsert product group ${idCode}:`, error);
    const message = typeof error === 'object' && error !== null && 'message' in error
      ? String((error as { message?: unknown }).message)
      : 'Unknown error';
    return { success: false, message };
  }
}

