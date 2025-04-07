export type Inventory = {
  id: string;
  productId: string;
  vendorId: string;
  stock: number;
  lowStockThreshold: number;
  lastUpdated: Date;
};
