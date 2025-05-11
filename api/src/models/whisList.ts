import mongoose, { Schema, Document } from 'mongoose';

export interface WishlistDocument extends Document {
  userId: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
}

const WishlistSchema = new Schema<WishlistDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'products' }]
});

export const WishlistModel = mongoose.model<WishlistDocument>('wishlists', WishlistSchema);
