import type { PaymentMethod } from "@/types/payments";

export const searchPaymentMethod = (method: PaymentMethod, term: string) => {
  const lower = term.toLowerCase();

  return (
    (method.brand?.toLowerCase().includes(lower) ?? false) ||  // safe now
    (method.provider?.toLowerCase().includes(lower) ?? false) ||
    method.type.toLowerCase().includes(lower)
  );
};

export const sortPaymentMethod = (
  a: PaymentMethod,
  b: PaymentMethod,
  key: string,
  direction: "asc" | "desc"
) => {
  const valA = (a as any)[key];
  const valB = (b as any)[key];

  if (valA < valB) return direction === "asc" ? -1 : 1;
  if (valA > valB) return direction === "asc" ? 1 : -1;
  return 0;
};
