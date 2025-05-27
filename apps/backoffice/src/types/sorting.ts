export type SortKey = 'name' | 'price' | 'category' | 'stock';
export type SortOrder = 'asc' | 'desc';
export type ViewMode = 'grid' | 'table';

export interface SortConfig {
  key: SortKey;
  direction: SortOrder;
}
