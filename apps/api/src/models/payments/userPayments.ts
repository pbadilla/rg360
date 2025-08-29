import { PaymentMethodDocument } from '@/models/payments/payments';

import mongoose, { Schema, Document } from 'mongoose';

// ----------------------
// UserPaymentMethod Types
// ----------------------
export type UserPaymentMethodStatus = 'active' | 'inactive';

export interface UserPaymentMethodDocument extends Document {
  userId: mongoose.Types.ObjectId; // which user owns this
  methodId: PaymentMethodDocument['_id']; // link to platform method (Visa, PayPal, etc.)
  last4?: string; // e.g. "4242"
  cardNumberMasked?: string; // e.g. "**** **** **** 4242"
  expirationMonth?: number; // e.g. 12
  expirationYear?: number; // e.g. 2026
  lastUsed?: Date;
  status: UserPaymentMethodStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ----------------------
// Schema Definition
// ----------------------
const UserPaymentMethodSchema = new Schema<UserPaymentMethodDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    methodId: { type: Schema.Types.ObjectId, ref: 'payment_methods', required: true },
    last4: { type: String },
    cardNumberMasked: { type: String },
    expirationMonth: { type: Number },
    expirationYear: { type: Number },
    lastUsed: { type: Date },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

export const UserPaymentMethodModel = mongoose.model<UserPaymentMethodDocument>(
  'user_payment_methods',
  UserPaymentMethodSchema
);
