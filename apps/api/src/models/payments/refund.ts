import mongoose, { Schema, Document } from 'mongoose';

export interface RefundDocument extends Document {
  transactionId: mongoose.Types.ObjectId;
  amount: number;
  reason?: string;
  status: 'pending' | 'processed' | 'failed';
  processedAt?: Date;
  createdAt: Date;
}

const RefundSchema = new Schema<RefundDocument>({
  transactionId: { type: Schema.Types.ObjectId, ref: 'transactions', required: true },
  amount: { type: Number, required: true },
  reason: { type: String },
  status: { type: String, enum: ['pending', 'processed', 'failed'], default: 'pending' },
  processedAt: { type: Date },
}, { timestamps: true });

export const RefundModel = mongoose.model<RefundDocument>('refunds', RefundSchema);
