import { inherits } from "util";

export type Payment = {
  id: string; // from _id.$oid
  userId: string; // from userId.$oid
  orderId: string; // from orderId.$oid
  amount: number; // parsed from $numberDouble
  paymentMethod: "credit_card" | "paypal" | "bank_transfer" | string; // adjust to known values
  transactionId: string;
  status: "success" | "failed" | "pending" | string; // again, adjust to expected statuses
  createdAt: Date;
};

export interface PaymentMethod {
  id: string;
  brand?: string;
  cardNumberMasked?: string;
  expirationMonth?: number;
  expirationYear?: number;
  last4?: string;      // optional now
  lastUsed?: string;
  status?: "active" | "inactive" | string;  // optional
  userId?: string;     // optional
  type: "card" | "paypal" | "bank_transfer" | "cod";
  provider?: string;
  isActive: boolean;
}

export const PAYMENT_METHOD_TYPES = [
  { label: "Credit Card", value: "credit_card" },
  { label: "PayPal", value: "paypal" },
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "Cash on Delivery", value: "cod" },
] as const;

export type PaymentMethodType = typeof PAYMENT_METHOD_TYPES[number]['value'];


export interface Transaction {
  id: string;
  customer: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed" | "refunded";
  paymentMethod: string;
  date: string;
  description: string;
}

export interface TransactionMethod extends Transaction {
  // Override paymentMethod type
  paymentMethod: PaymentMethodType;
}

export interface Refund {
  id: string;
  transactionId: string;
  customer: string;
  originalAmount: number;
  refundAmount: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "processed";
  requestDate: string;
  processedDate?: string;
}