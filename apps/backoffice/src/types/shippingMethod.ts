export interface ShippingMethod {
  id: string;
  name: string;
  carrier: string;
  estimatedDays: number;
  cost: number;
  active: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
