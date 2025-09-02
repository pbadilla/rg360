export const formatPriceForMongoDB = (
  priceValue: string | number
): string => {
  const numericPrice =
    typeof priceValue === "string" ? parseFloat(priceValue) : priceValue;

  if (Number.isNaN(numericPrice) || numericPrice < 0) {
    return "0.00 EUR";
  }

  const amount = (Math.round(numericPrice * 100) / 100).toFixed(2);

  return amount;
};