
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product, SortConfig, SortKey, SortOrder, ViewMode } from '@/types/product';
// import { products as initialProducts } from '@/data/products';
import { searchProducts, sortProducts } from '@/utils/productUtils';
import { toast } from 'sonner';

// import { useQueryClient } from '@tanstack/react-query';
// import { useStoreCSVData } from '@/store/storeCSVData';
import { useStoreProducts } from '@/store/storeProducts';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  searchTerm: string;
  sortConfig: SortConfig;
  viewMode: ViewMode;
  setSearchTerm: (term: string) => void;
  setSortConfig: (config: SortConfig) => void;
  setViewMode: (mode: ViewMode) => void;
  deleteProduct: (id: string) => void;
  editProduct: (product: Product) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  importCSVData: (data: Product[]) => void;
}

const defaultSortConfig: SortConfig = {
  key: 'name',
  direction: 'asc'
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(defaultSortConfig);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => {
    setLoading(true);
    try {
      // Small delay to simulate API call and show loading state
      const timer = setTimeout(() => {
        const searched = searchProducts(products, searchTerm);
        const sorted = sortProducts(searched, sortConfig);
        setFilteredProducts(sorted);
        setLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error filtering products:', error);
      setLoading(false);
    }
  }, [products, searchTerm, sortConfig]);

  const deleteProduct = (id: string) => {
    setProducts(prevProducts => {
      const newProducts = prevProducts.filter(product => product.id !== id);
      toast.success('Product deleted successfully');
      return newProducts;
    });
  };

  const editProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => {
      const newProducts = prevProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      );
      return newProducts;
    });
  };

  const addProduct = (product: Product) => {
    setProducts(prevProducts => [...prevProducts, product]);
  };

  const importCSVData = (data: Product[]) => {
    setProducts(data);
    const csvData = {
      headers: Object.keys(data[0] || {}),
      rows: data.map(product => Object.values(product)),
    };
    // mutate({ parsedData: csvData, title: 'Imported Products' });
    toast.success('CSV data imported successfully');
  };

  const value = {
    products,
    filteredProducts,
    loading,
    searchTerm,
    sortConfig,
    viewMode,
    setSearchTerm,
    setSortConfig,
    setViewMode,
    deleteProduct,
    editProduct,
    addProduct,
    importCSVData,
  };

  const { mutate } = useStoreProducts();

  useEffect(() => {
    mutate({ data: products, title: 'ProductsStore' });
  }, [products, mutate]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
