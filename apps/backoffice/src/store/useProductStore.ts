import { useState, useEffect } from "react";

import type { Product } from "@/types/product";

import { useEntityStore } from "./useEntityStore";

import api from "@/config/axiosConfig";

// Custom search function for products
const searchProducts = (
  products: Product[],
  term: string,
  brands: string[] // new param
) => {
  return products.filter((p) => {
    const name =
      typeof (p as Product & { Name?: string }).name === "string"
        ? (p as Product & { Name?: string }).name
        : typeof (p as Product & { Name?: string }).Name === "string"
        ? (p as Product & { Name?: string }).Name!
        : "";

    const brand = (p as Product & { Brand?: string }).brand ?? (p as Product & { Brand?: string }).Brand ?? "";

    const matchesTerm = !term || name.toLowerCase().includes(term.toLowerCase());
    const matchesBrand = brands.length === 0 || brands.includes(brand);

    return matchesTerm && matchesBrand;
  });
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
  const [missingDescriptions, setMissingDescriptions] = useState(0);
  const [showMissingDescriptions, setShowMissingDescriptions] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);


  const store = useEntityStore<Product>({
    queryKey: `products-${currentPage}-${pageSize}`,
    fetchFn: async () => {
      const res = await api.get("/products", {
        params: { 
          page: currentPage, 
          pageSize,
          missingDescription: showMissingDescriptions ? true : undefined,
        },
      });

      const products = res.data.products ?? [];
      const total = res.data.total ?? products.length;

      setTotalProducts(total);

      // 👇 capture the backend’s missing count if available
      setMissingDescriptions(res.data.missingDescriptions ?? 0);

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
    searchFn: (products, term) => searchProducts(products, term, selectedBrands),
    sortFn: sortProducts,
  });

  // refetch whenever page or pageSize changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    store.refetch?.();
  }, [currentPage, pageSize, store]);

  const brandsList = Array.from(
    new Set(
      store.entities.map((p) => (p.brand ?? (typeof p === "object" && "Brand" in p ? (p as { Brand?: string }).Brand : undefined)) || "")
    )
  ).filter((b): b is string => Boolean(b)).sort();

  return {
    // data
    products: store.entities,
    filteredProducts: store.filteredEntities,
    totalProducts,
    brandsList,
    selectedBrands,
    setSelectedBrands,
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
  
    // Descriptions
    missingDescriptions,
    showMissingDescriptions,
    setShowMissingDescriptions,
  };
};
