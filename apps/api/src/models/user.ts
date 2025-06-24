import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = 'user' | 'admin';

const AddressSchema = new Schema({
  line1: { type: String, required: true },
  line2: { type: String },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false });

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true }, // Store hashed password
  phone: { type: String },
  addresses: { type: [AddressSchema], default: [] },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export interface UserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  addresses: Array<{
    line1: string;
    line2?: string;
    city: string;
    zip: string;
    country: string;
  }>;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const UserModel = mongoose.model<UserDocument>('user', UserSchema, 'users');

// Auth Tips (Optional but Important)
// Use bcrypt to hash and verify passwords.
// Never store plain-text passwords.
// Use JWT for login sessions.