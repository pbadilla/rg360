import type { Product } from "@/types/product";

/**
 * Sort products by stock availability and quantity.
 * - In-stock first
 * - Then out-of-stock
 * - Within each group, sorted by stock descending
 * - If stock is equal, sorted by name ascending
 */
export const sortByStock = (a: Product, b: Product): number => {
  if (a.stock > 0 && b.stock <= 0) return -1;
  if (a.stock <= 0 && b.stock > 0) return 1;

  if (a.stock !== b.stock) return b.stock - a.stock;

  return a.name.localeCompare(b.name);
};
