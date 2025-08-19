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
