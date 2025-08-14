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

export interface TrackingEntry {
  id: string;
  trackingNumber: string;
  shippingMethodId: string;
  customerName: string;
  destination: string;
  status: "pending" | "in_transit" | "delivered" | "exception";
  createdAt: Date;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
}