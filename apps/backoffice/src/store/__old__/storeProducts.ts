import { useMemo, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { Product } from "@/types/product";

import api from "@/config/axiosConfig";
import { searchProducts, sortProducts } from "@/utils/productUtils";

const PRODUCTS_QUERY_KEY = ["products"];

type ViewMode = "grid" | "list";
type SortConfig = {
  key: keyof Product;
  direction: "asc" | "desc";
};

// Custom hook that replaces your context
export const useProductStore = () => {
  const queryClient = useQueryClient();

  // Local state for UI controls (these don't need to be in React Query)
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // React Query for products data
  const {
    data: products = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: async () => {
      const response = await api.get("/products");
      return response.data.products ?? []; // ✅ extract the array
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Computed filtered products (derived state)
  const filteredProducts = useMemo(() => {
    const searched = searchProducts(products, searchTerm);
    return sortProducts(searched, sortConfig);
  }, [products, searchTerm, sortConfig]);

  // Mutations for CRUD operations
  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      // Replace with actual API call
      // await deleteProductAPI(id);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(PRODUCTS_QUERY_KEY, (old: Product[] = []) =>
        old.filter((product) => product.id !== deletedId),
      );
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete product");
      console.error("Delete error:", error);
    },
  });

  const editProductMutation = useMutation({
    mutationFn: async (product: Product) => {
      // Replace with actual API call
      // return await updateProductAPI(product);
      return product;
    },
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(PRODUCTS_QUERY_KEY, (old: Product[] = []) =>
        old.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        ),
      );
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update product");
      console.error("Update error:", error);
    },
  });

  const addProductMutation = useMutation({
    mutationFn: async (product: Omit<Product, "id">) => {
      // Replace with actual API call
      // return await createProductAPI(product);
      const newProduct = { ...product, id: Date.now().toString() };
      return newProduct;
    },
    onSuccess: (newProduct) => {
      queryClient.setQueryData(PRODUCTS_QUERY_KEY, (old: Product[] = []) => [
        ...old,
        newProduct,
      ]);
      toast.success("Product added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add product");
      console.error("Add error:", error);
    },
  });

  const importCSVMutation = useMutation({
    mutationFn: async (data: Product[]) => {
      // Replace with actual API call if needed
      // await importCSVAPI(data);
      return data;
    },
    onSuccess: (importedData) => {
      queryClient.setQueryData(PRODUCTS_QUERY_KEY, importedData);
      toast.success("CSV data imported successfully");
    },
    onError: (error) => {
      toast.error("Failed to import CSV data");
      console.error("Import error:", error);
    },
  });

  return {
    // Data
    products,
    filteredProducts,
    loading,
    error,

    // UI State
    searchTerm,
    sortConfig,
    viewMode,

    // UI State Setters
    setSearchTerm,
    setSortConfig,
    setViewMode,

    // Actions
    deleteProduct: deleteProductMutation.mutate,
    editProduct: editProductMutation.mutate,
    addProduct: addProductMutation.mutate,
    importCSVData: importCSVMutation.mutate,

    // Loading states for actions
    isDeleting: deleteProductMutation.isPending,
    isEditing: editProductMutation.isPending,
    isAdding: addProductMutation.isPending,
    isImporting: importCSVMutation.isPending,
  };
};
