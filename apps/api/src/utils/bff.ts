import { Order, Payment, Stock, User, Vendor } from "@/types/bff";

function omitFields(obj: Record<string, any>, fields: string[] = []) {
  const copy = { ...obj };
  for (const field of fields) {
    delete copy[field];
  }
  return copy;
}

function transformPayment(data: any): Payment {
  return {
    id: data._id?.$oid || '',
    userId: data.userId?.$oid || '',
    orderId: data.orderId?.$oid || '',
    amount: parseFloat(data.amount?.$numberDouble || '0'),
    paymentMethod: data.paymentMethod,
    transactionId: data.transactionId,
    status: data.status,
    createdAt: new Date(data.createdAt?.$date?.$numberLong),
  };
}

function transformOrder(data: any): Order {
  return {
    id: data._id?.$oid || '',
    userId: data.userId?.$oid || '',
    items: (data.items || []).map((item: any) => ({
      productId: item.productId?.$oid || '',
      vendorId: item.vendorId?.$oid || '',
      quantity: parseInt(item.quantity?.$numberInt || '0'),
      price: parseFloat(item.price?.$numberDouble || '0'),
    })),
    totalAmount: parseFloat(data.totalAmount?.$numberDouble || '0'),
    status: data.status,
    createdAt: new Date(data.createdAt?.$date?.$numberLong),
    updatedAt: new Date(data.updatedAt?.$date?.$numberLong),
  };
}

function transformstock(data: any): Stock {
  return {
    id: data._id?.$oid || '',
    productId: data.productId?.$oid || '',
    vendorId: data.vendorId?.$oid || '',
    stock: parseInt(data.stock?.$numberInt || '0'),
    lowStockThreshold: parseInt(data.lowStockThreshold?.$numberInt || '0'),
    lastUpdated: new Date(data.lastUpdated?.$date?.$numberLong),
  };
}

function transformUser(data: any): User {
  return {
    id: data._id?.$oid || '',
    name: data.name,
    email: data.email,
    role: data.role,
    createdAt: new Date(data.createdAt?.$date?.$numberLong),
    updatedAt: new Date(data.updatedAt?.$date?.$numberLong),
  };
}

function transformVendor(data: any): Vendor {
  return {
    id: data._id?.$oid || '',
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: {
      street: data.address?.street || '',
      city: data.address?.city || '',
      state: data.address?.state || '',
      zip: data.address?.zip || '',
      country: data.address?.country || '',
    },
    createdAt: new Date(data.createdAt?.$date?.$numberLong),
    updatedAt: new Date(data.updatedAt?.$date?.$numberLong),
  };
}

export { transformUser , transformOrder, transformPayment, transformstock, transformVendor, omitFields };