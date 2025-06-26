export const searchEntities = <T>(
  items: T[],
  searchTerm: string,
  fields: (keyof T)[]
): T[] => {
  if (!searchTerm.trim()) return items;

  const lowerSearch = searchTerm.toLowerCase();

  return items.filter(item =>
    fields.some(field => {
      const value = item[field];
      return (
        typeof value === 'string' &&
        value.toLowerCase().includes(lowerSearch)
      );
    })
  );
};
