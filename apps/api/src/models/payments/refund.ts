import mongoose, { Schema, Document } from "mongoose";

export interface RefundDocument extends Document {
  transactionId: mongoose.Types.ObjectId;
  customer: string;
  originalAmount: number;
  refundAmount: number;
  reason?: string;
  status: "pending" | "approved" | "failed";
  requestDate: Date;
  processedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RefundSchema = new Schema<RefundDocument>(
  {
    transactionId: { type: Schema.Types.ObjectId, ref: "transactions", required: true },
    customer: { type: String, required: true },
    originalAmount: { type: Number, required: true },
    refundAmount: { type: Number, required: true },
    reason: { type: String },
    status: { type: String, enum: ["pending", "approved", "failed"], default: "pending" },
    requestDate: { type: Date, required: true },
    processedDate: { type: Date },
  },
  { timestamps: true }
);

export const RefundModel = mongoose.model<RefundDocument>("refunds", RefundSchema);
