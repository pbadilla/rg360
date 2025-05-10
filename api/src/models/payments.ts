import mongoose, { Schema, Document } from 'mongoose';

export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface PaymentDocument extends Document {
  orderId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  paymentMethod: string;
  status: PaymentStatus;
  createdAt: Date;
}

const PaymentSchema = new Schema<PaymentDocument>({
  orderId: { type: Schema.Types.ObjectId, ref: 'orders', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  amount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

export const PaymentModel = mongoose.model<PaymentDocument>('payments', PaymentSchema);
