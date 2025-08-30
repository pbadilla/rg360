export const searchEntity = <T extends Record<string, any>>(
  entity: T,
  term: string,
  keys: (keyof T)[]
): boolean => {
  const lower = term.toLowerCase();

  return keys.some((key) => {
    const value = entity[key];
    return typeof value === "string" && value.toLowerCase().includes(lower);
  });
};


export const sortEntity = <T extends Record<string, any>>(
  a: T,
  b: T,
  key: keyof T,
  direction: "asc" | "desc" = "asc"
) => {
  const valA = a[key];
  const valB = b[key];

  if (valA == null && valB != null) return direction === "asc" ? -1 : 1;
  if (valB == null && valA != null) return direction === "asc" ? 1 : -1;
  if (valA == null && valB == null) return 0;

  if (valA < valB) return direction === "asc" ? -1 : 1;
  if (valA > valB) return direction === "asc" ? 1 : -1;
  return 0;
};
