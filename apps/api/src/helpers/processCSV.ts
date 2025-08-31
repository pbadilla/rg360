import { CsvRow } from "@/types/products";

async function processCsvSource<T extends CsvRow>(
  rows: T[],
  groupByKey: keyof T,
  processor: (skuRoot: string, rows: T[]) => Promise<any>
) {
  const grouped: Record<string, T[]> = {};
  for (const row of rows) {
    const key = row[groupByKey];
    if (!key) continue;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(row);
  }

  const results = [];
  for (const [skuRoot, groupRows] of Object.entries(grouped)) {
    results.push(await processor(skuRoot, groupRows));
  }
  return results;
}
