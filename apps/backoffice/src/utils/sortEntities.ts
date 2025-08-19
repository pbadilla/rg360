type SortDirection = "asc" | "desc";

export const sortEntities = <T>(
  items: T[] = [], // <- default to empty array
  config: { key: keyof T; direction: SortDirection },
): T[] => {
  const { key, direction } = config;

  return [...items].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });
};
