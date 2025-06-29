import { Order } from "@/types/orders";
import { searchEntities } from "@/utils/searchEntities";
import { sortEntities } from "@/utils/sortEntities";


export const searchOrder = (products: Order[], term: string) =>
  searchEntities(products, term, ['name', 'description']);

export const sortOrder = (products: Order[], config: { key: keyof Order; direction: 'asc' | 'desc' }) =>
  sortEntities(products, config);