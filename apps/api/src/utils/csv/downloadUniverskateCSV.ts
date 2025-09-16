import axios from 'axios';
import fs from 'fs';
import basicAuth from 'basic-auth-header';
import { Request, Response } from 'express';
import { removeFirstRow } from '@/utils/removeFirstRow';
import { CsvRow } from '@/types/products';
import { processUniverskateGroup } from './processUniverskateGroup';
import { formatPriceForMongoDB } from '@/utils/prices';
import { ProductModel } from '@/models/product';

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
            Stock: parseInt(raw['AVAILABLE STOCK'] || '0', 10),
            Name: raw['PRODUCT DESCRIPTION'],
            Image: raw['PICTURES'],
            Brand: raw['BRAND'],
            Categories: raw['CATEGORIES'],
            Family: raw['MOTHER REF'],
            Weight: '0', // fallback
          };
        });

        // 🔹 Group by Family
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

        // ✅ Now compare with MongoDB
        const references = csvRows.map(r => r.Reference);
        const names = csvRows.map(r => r.Name);

        // Add pattern extraction with names included:
        const extractPatterns = (references: string[], names: string[]) => {
          const patterns = new Map<string, { count: number, names: string[] }>();
          const prefixPatterns = new Map<string, { count: number, names: string[] }>();

          references.forEach((ref, i) => {
            const name = names[i];

            // Extract prefix patterns (everything before first dash or number)
            const prefixMatch = ref.match(/^([A-Z]+)/);
            if (prefixMatch) {
              const prefix = prefixMatch[1];
              const existing = prefixPatterns.get(prefix) || { count: 0, names: [] };
              existing.count++;
              if (existing.names.length < 10) existing.names.push(name); // limit stored names
              prefixPatterns.set(prefix, existing);
            }

            // Extract full patterns (up to first variable part)
            const patternMatch = ref.match(/^([A-Z]+-[A-Z0-9]*)/);
            if (patternMatch) {
              const pattern = patternMatch[1];
              const existing = patterns.get(pattern) || { count: 0, names: [] };
              existing.count++;
              if (existing.names.length < 10) existing.names.push(name); // limit stored names
              patterns.set(pattern, existing);
            }
          });

          return { patterns, prefixPatterns };
        };

        const { patterns, prefixPatterns } = extractPatterns(references, names);

        // Log to console
        console.log('=== PREFIX PATTERNS ===');
        Array.from(prefixPatterns.entries())
          .sort((a, b) => b[1].count - a[1].count)
          .forEach(([pattern, data]) => {
            console.log(`${pattern}: ${data.count} products, sample names: ${data.names.join(', ')}`);
          });

        console.log('\n=== DETAILED PATTERNS ===');
        Array.from(patterns.entries())
          .sort((a, b) => b[1].count - a[1].count)
          .forEach(([pattern, data]) => {
            console.log(`${pattern}: ${data.count} products, sample names: ${data.names.join(', ')}`);
          });

        // Optional: Write to file
        fs.writeFileSync('./patterns.json', JSON.stringify({
          prefixPatterns: Object.fromEntries(prefixPatterns),
          detailedPatterns: Object.fromEntries(patterns),
          sampleReferences: references.slice(0, 20),
          sampleNames: names.slice(0, 20)
        }, null, 2));

        
        const dbProducts = await ProductModel.find({ reference: { $in: references } }).lean();

        const dbMap = new Map(dbProducts.map(p => [p.reference, p]));

        const comparisons = csvRows.map(row => {
          const dbProduct = dbMap.get(row.Reference);

          if (!dbProduct) {
            return { status: 'new', row };
          }

          const diffs: Record<string, { csv: any; db: any }> = {};
          const fieldsToCheck: (keyof CsvRow | keyof typeof dbProduct)[] = [
            'ean13',
            'Name',
            'Brand',
            'Stock',
          ];

          for (const key of fieldsToCheck) {
            const csvVal = (row as any)[key];
            // Only call toLowerCase if key is a string
            let dbVal;
            if (typeof key === 'string') {
              dbVal = (dbProduct as any)[key.toLowerCase()] ?? (dbProduct as any)[key];
            } else {
              dbVal = (dbProduct as any)[key];
            }

            if (csvVal != null && dbVal != null && csvVal.toString() !== dbVal.toString()) {
              diffs[key as string] = { csv: csvVal, db: dbVal };
            }
          }

          return Object.keys(diffs).length > 0
            ? { status: 'updated', row, diffs }
            : { status: 'unchanged', row };
        });

        const newProducts = comparisons.filter(c => c.status === 'new');
        const updatedProducts = comparisons.filter(c => c.status === 'updated');
        const unchangedProducts = comparisons.filter(c => c.status === 'unchanged');

        res.json({
          message: 'Processed grouped Universkate products',
          totalGroups: results.length,
          successGroups: results.filter(r => !r.errors || r.errors.length === 0).length,
          failedGroupsCount: results.filter(r => r.errors && r.errors.length > 0).length,
          successSkuRoots: results
            .filter(r => !r.errors || r.errors.length === 0)
            .map(r => r.skuRoot),
          errors: results
            .filter(r => r.errors && r.errors.length > 0)
            .map(r => ({ skuRoot: r.skuRoot, errors: r.errors })),
          products: results,
          comparison: {
            newProductsCount: newProducts.length,
            updatedProductsCount: updatedProducts.length,
            unchangedProductsCount: unchangedProducts.length,
            updatedProducts,
          },
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
