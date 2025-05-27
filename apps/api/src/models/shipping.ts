import mongoose, { Schema, Document } from 'mongoose';

export interface ShippingDocument extends Document {
  userId: mongoose.Types.ObjectId;
  address: {
    line1: string;
    line2?: string;
    city: string;
    zip: string;
    country: string;
  };
  phone?: string;
}

const ShippingSchema = new Schema<ShippingDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
  address: {
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  phone: { type: String }
});

export const ShippingModel = mongoose.model<ShippingDocument>('shippings', ShippingSchema);
