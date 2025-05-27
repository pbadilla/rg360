import { Sizes } from "@/types/product";

type StatusOrder = 'processing' | 'shipped' | 'delivered' | 'cancelled' | string;
type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer';
type PaymentStatus = 'paid' | 'pending' | 'failed';
type ReturnStatus = 'pending' | 'approved' | 'rejected';

type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type PaymentDetails = {
  method: PaymentMethod;
  status: PaymentStatus;
};

export type OrderItem = {
  productId: string;
  vendorId: string;
  color: string;
  size: Sizes;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: StatusOrder;
  shippingAddress: Address;
  billingAddress: Address;
  payment: PaymentDetails;
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
  shippingDate?: Date;
  deliveryDate?: Date;
  cancellationDate?: Date;

  return?: {
    date?: Date;
    reason?: string;
    status?: ReturnStatus;
    trackingNumber?: string;
    trackingUrl?: string;
    shippingDate?: Date;
    deliveryDate?: Date;
    cancellationDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    notes?: string;
    shippingAddress?: Address;
    billingAddress?: Address;
    payment?: PaymentDetails;
  };

  createdAt: Date;
  updatedAt: Date;
};
