import mongoose, { Schema, Document } from "mongoose";

export interface CarrierDocument extends Document {
  name: string;              // "Standard ground shipping"
  carrier: string;           // "FedEx"
  estimatedDays: number;     // 5
  cost: number;              // 7.99
  active: boolean;           // true
  description?: string;      // "Delivery within 5 business days via ground shipping."
  createdAt: Date;
  updatedAt: Date;
}

const CarrierSchema = new Schema<CarrierDocument>(
  {
    name: { type: String, required: true },
    carrier: { type: String, required: true }, // Could also be an enum if you want to restrict values
    estimatedDays: { type: Number, required: true },
    cost: { type: Number, required: true },
    active: { type: Boolean, default: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const CarrierModel = mongoose.model<CarrierDocument>(
  "carriers",
  CarrierSchema
);
