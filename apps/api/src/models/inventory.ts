import mongoose, { Schema, Document } from 'mongoose';

interface stockDocument extends Document {
  productId: mongoose.Types.ObjectId;
  variationId?: string;
  size?: string;
  stock: number;
  own_stock?: boolean;
  location?: string;
  qrCodeData: string;
  qrCodeImageUrl?: string;
  updatedAt: Date;
  createdAt: Date;
}

const stockSchema = new Schema<stockDocument>({
  productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
  variationId: { type: String },
  size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
  stock: { type: Number, required: true },
  own_stock: { type: Boolean, default: false },
  location: { type: String },
  qrCodeData: { type: String, required: true }, // what the QR code encodes
  qrCodeImageUrl: { type: String }, 
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const stockModel = mongoose.model<stockDocument>('stock', stockSchema);
