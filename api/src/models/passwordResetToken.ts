// models/passwordResetToken.ts
import mongoose, { Schema, Document } from 'mongoose';

interface PasswordResetTokenDocument extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const PasswordResetTokenSchema = new Schema<PasswordResetTokenDocument>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const PasswordResetTokenModel = mongoose.model<PasswordResetTokenDocument>(
  'PasswordResetToken',
  PasswordResetTokenSchema
);
