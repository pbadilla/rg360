import mongoose, { Schema, Document } from 'mongoose';

type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

const OrderedProductSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
  name: { type: String, required: true },
  reference: { type: String, required: true },
  size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], required: true },
  color: { type: String },
  quantity: { type: Number, required: true },
  priceAtPurchase: {
    pvp: { type: Number, required: true },
    pv: { type: Number, required: true },
    benefit_percentage: { type: Number, required: true }
  }
}, { _id: false });

const OrderSchema = new Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      line1: { type: String, required: true },
      line2: { type: String },
      city: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true }
    }
  },
  products: { type: [OrderedProductSchema], required: true },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String }, // optional, e.g., "stripe", "paypal"
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export interface OrderDocument extends Document {
  customer: {
    name: string;
    email: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      zip: string;
      country: string;
    };
  };
  products: Array<{
    productId: mongoose.Types.ObjectId;
    name: string;
    reference: string;
    size: string;
    color?: string;
    quantity: number;
    priceAtPurchase: {
      pvp: number;
      pv: number;
      benefit_percentage: number;
    };
  }>;
  status: OrderStatus;
  totalAmount: number;
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const OrderModel = mongoose.model<OrderDocument>('orders', OrderSchema);


// Each order should include:
//     Customer info (name, email, address)
//     Products (linked from ProductModel with quantity, variation, size, price at time of order)
//     Order status (e.g. pending, paid, shipped, delivered, cancelled)
//     Timestamps (created, updated)
//     Payment info (optional now, extensible later)
