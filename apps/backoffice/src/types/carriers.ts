export interface Carrier {
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

