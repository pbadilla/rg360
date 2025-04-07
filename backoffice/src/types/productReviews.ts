export type ProductReview = {
  id: string;
  userId: string;
  productId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
};
