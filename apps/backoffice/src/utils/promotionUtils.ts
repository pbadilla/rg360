import type { Promotion } from "@/types/promotion";

// @/utils/promotionUtils.ts
export const searchPromotion = (promotion: Promotion, term: string) => {
  return (
    promotion.title.toLowerCase().includes(term.toLowerCase()) ||
    promotion.description.toLowerCase().includes(term.toLowerCase())
  );
};

export const sortPromotion = (
  a: Promotion,
  b: Promotion,
  key: string,
  direction: "asc" | "desc",
) => {
  const valA = a[key];
  const valB = b[key];
  if (valA < valB) return direction === "asc" ? -1 : 1;
  if (valA > valB) return direction === "asc" ? 1 : -1;
  return 0;
};
