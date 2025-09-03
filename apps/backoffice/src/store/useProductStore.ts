import { useState, useEffect } from "react";
import api from "@/config/axiosConfig";
import type { Product } from "@/types/product";
import { useEntityStore } from "./useEntityStore";

// Custom search function for products
const searchProducts = (products: Product[], term: string) => {
  if (!term) return products;
  return products.filter((p) =>
    p.name.toLowerCase().includes(term.toLowerCase())
  );
};

// Custom sort function for products
const sortProducts = (
  products: Product[],
  config: { key: keyof Product; direction: "asc" | "desc" }
) => {
  return [...products].sort((a, b) => {
    const aVal = a[config.key];
    const bVal = b[config.key];

    if (aVal < bVal) return config.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return config.direction === "asc" ? 1 : -1;
    return 0;
  });
};

export const useProductStore = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);

  const store = useEntityStore<Product>({
    queryKey: ["products", currentPage, pageSize],
    fetchFn: async () => {
      const res = await api.get("/products", {
        params: { page: currentPage, pageSize },
      });

      const products = res.data.products ?? [];
      const total = res.data.total ?? products.length;

      setTotalProducts(total);

      return { data: products, total };
    },
    createFn: async (product) => {
      const res = await api.post("/products", product);
      return res.data.product;
    },
    updateFn: async (product) => {
      const res = await api.put(`/products/${product.id}`, product);
      return res.data.product;
    },
    deleteFn: async (id) => {
      await api.delete(`/products/${id}`);
      return id;
    },
    importFn: async (data) => {
      const res = await api.post("/products/import", data);
      return res.data.products;
    },
    defaultSort: { key: "name", direction: "asc" },
    searchFn: searchProducts,
    sortFn: sortProducts,
  });

  // refetch whenever page or pageSize changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    store.refetch?.();
  }, [currentPage, pageSize]);

  return {
    // data
    products: store.entities,
    filteredProducts: store.filteredEntities,
    totalProducts,
    currentPage,
    pageSize,
    totalPages: Math.ceil(totalProducts / pageSize),
    loading: store.isLoading,
    error: store.error,

    // ui state
    searchTerm: store.searchTerm,
    sortConfig: store.sortConfig,
    viewMode: store.viewMode,

    // setters
    setSearchTerm: store.setSearchTerm,
    setSortConfig: store.setSortConfig,
    setViewMode: store.setViewMode,
    setCurrentPage,
    setPageSize,

    // actions
    addProduct: store.addEntity,
    editProduct: store.editEntity,
    deleteProduct: store.deleteEntity,
    importCSVData: store.importEntities,

    // loading states
    isAdding: store.isAdding,
    isEditing: store.isEditing,
    isDeleting: store.isDeleting,
    isImporting: store.isImporting,
  };
};
