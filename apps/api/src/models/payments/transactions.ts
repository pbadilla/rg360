import mongoose, { Schema, Document } from 'mongoose';

export interface TransactionDocument extends Document {
  id: string;
  customer: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed" | "refunded";
  paymentMethod: string;
  date: Date;
  description: string;
}
const TransactionSchema = new Schema<TransactionDocument>({
    id: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["completed", "pending", "failed", "refunded"], 
    required: true 
  },
  paymentMethod: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true }
}, { timestamps: true });



export const TransactionModel = mongoose.model<TransactionDocument>('transactions', TransactionSchema);


