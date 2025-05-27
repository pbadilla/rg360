import mongoose, { Schema, Document } from 'mongoose';

export interface VendorDocument extends Document {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
}

const VendorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
});

export const VendorModel = mongoose.model<VendorDocument>('vendors', VendorSchema);
