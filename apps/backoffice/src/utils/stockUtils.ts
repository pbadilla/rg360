// utils/stockUtils.ts
import type { Stock } from "@/types/stock";

import { searchEntities } from "@/utils/searchEntities";
import { sortEntities } from "@/utils/sortEntities";

export const searchStock = (items: Stock[], term: string) =>
  searchEntities(items, term, [
    "reference",
    "brand",
    "ean13",
    "parentReference",
    "name",
  ]);

export const sortStock = (
  items: Stock[],
  config: { key: keyof Stock; direction: "asc" | "desc" },
) => sortEntities(items, config);
