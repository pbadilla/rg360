import mongoose, { Schema, Document } from 'mongoose';

type PromoStatus = 'active' | 'inactive';

interface CTA {
  text: string;
  link: string;
}

interface Schedule {
  start: Date | string;
  end: Date | string;
}

export interface PromotionsDocument extends Document {
  title: string;
  description?: string;
  backgroundColor?: string;
  textColor?: string;
  cta?: CTA;
  schedule?: Schedule;
  bannerImage?: string;
  status: PromoStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Subschemas
const CTASchema = new Schema<CTA>(
  {
    text: { type: String, required: true },
    link: { type: String, required: true },
  },
  { _id: false }
);

const ScheduleSchema = new Schema<Schedule>(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { _id: false }
);

// Main Schema
export const PromotionsSchema = new Schema<PromotionsDocument>({
  title: { type: String, required: true },
  description: { type: String },
  backgroundColor: { type: String },
  textColor: { type: String },
  cta: { type: CTASchema },
  schedule: { type: ScheduleSchema },
  bannerImage: { type: String },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// To prevent OverwriteModelError
export const PromotionsModel =
  mongoose.models.Promotions || mongoose.model<PromotionsDocument>('Promotions', PromotionsSchema);
