import mongoose, { Schema, Document } from 'mongoose';

interface StockDocument extends Document {
  productId: mongoose.Types.ObjectId;
  category?: string;
  createdAt: Date;
  description?: string;
  location?: string;
  metadata?: Record<string, any>;
  own_stock?: boolean;
  qrCodeData: string;
  qrCodeImageUrl?: string;
  size?: string;
  stock: number;
  updatedAt: Date;
  variantName?: string;
  variationId?: string;
}


const StockSchema = new Schema<StockDocument>({
  productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  description: { type: String },
  location: { type: String },
  metadata: { type: Schema.Types.Mixed },
  own_stock: { type: Boolean, default: false },
  qrCodeData: { type: String, required: true },
  qrCodeImageUrl: { type: String },
  size: { type: String },
  stock: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
  variantName: { type: String },
  variationId: { type: String },
});

export const StockModel = mongoose.model<StockDocument>('stocks', StockSchema);
