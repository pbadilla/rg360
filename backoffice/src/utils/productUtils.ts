
import { Product, SortConfig } from "@/types/product";

export const searchProducts = (products: Product[], searchTerm: string): Product[] => {
  if (!searchTerm.trim()) return products;
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
    product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
    product.category.toLowerCase().includes(lowerCaseSearchTerm)
  );
};

export const sortProducts = (products: Product[], sortConfig: SortConfig): Product[] => {
  return [...products].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    }
    
    return 0;
  });
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
