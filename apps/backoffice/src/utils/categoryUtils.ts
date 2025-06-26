import { Category } from "@/types/category";
import { searchEntities } from "@/utils/searchEntities";
import { sortEntities } from "@/utils/sortEntities";


export const searchCategory = (products: Category[], term: string) =>
  searchEntities(products, term, ['name', 'description']);

export const sortCategory = (products: Category[], config: { key: keyof Category; direction: 'asc' | 'desc' }) =>
  sortEntities(products, config);