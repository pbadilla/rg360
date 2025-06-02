export type Order = {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    vendorId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Stock = {
  id: string;
  productId: string;
  vendorId: string;
  stock: number;
  lowStockThreshold: number;
  lastUpdated: Date;
};

// Define Payment type if not imported from elsewhere
export type Payment = {
  id: string;
  userId: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  status: string;
  createdAt: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Vendor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
