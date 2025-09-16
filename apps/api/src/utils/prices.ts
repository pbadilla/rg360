export const formatPriceForMongoDB = (priceValue: string | number): number => {
  const numericPrice =
    typeof priceValue === "string" ? parseFloat(priceValue) : priceValue;

  if (Number.isNaN(numericPrice) || numericPrice < 0) return 0;

  return Math.round(numericPrice * 100) / 100;
};
