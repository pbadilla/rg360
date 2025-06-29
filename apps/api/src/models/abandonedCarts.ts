import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAbandonedCart extends Document {
  user: Types.ObjectId;
  items: Array<any>;
  totalAmount: number;
  status: 'abandoned' | 'recovered';
  createdAt: Date;
  lastUpdatedAt: Date;
  reminderCount: number;
  reminderHistory: Array<{
    sentAt: Date;
  }>;
  lastReminderSentAt: Date;
}

const AbandonedCartSchema: Schema<IAbandonedCart> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [{ type: Schema.Types.Mixed }], default: [] },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['abandoned', 'recovered'],
      default: 'abandoned',
    },
    reminderCount: { type: Number, default: 0 },
    reminderHistory: [
      {
        sentAt: { type: Date, required: true },
      },
    ],
    lastReminderSentAt: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'lastUpdatedAt',
    },
  }
);

export const AbandonedCartsModel = mongoose.model<IAbandonedCart>(
  'AbandonedCart',
  AbandonedCartSchema,
  'abandonedcarts'
);
