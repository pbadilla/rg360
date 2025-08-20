import mongoose, { Schema, Document } from 'mongoose';

export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface PaymentMethodDocument extends Document {
  name: string; // "Visa", "PayPal", "Stripe"
  type: 'credit_card' | 'paypal' | 'bank_transfer' | 'cod';
  provider?: string; // optional e.g. Stripe, Adyen
  isActive: boolean;
  config?: Record<string, any>; // credentials, fees
  createdAt: Date;
  updatedAt: Date;
}

const PaymentMethodSchema = new Schema<PaymentMethodDocument>({
  name: { type: String, required: true },
  type: { type: String, enum: ['credit_card', 'paypal', 'bank_transfer', 'cod'], required: true },
  provider: { type: String },
  isActive: { type: Boolean, default: true },
  config: { type: Schema.Types.Mixed },
}, { timestamps: true });

export const PaymentMethodModel = mongoose.model<PaymentMethodDocument>('payment_methods', PaymentMethodSchema);
