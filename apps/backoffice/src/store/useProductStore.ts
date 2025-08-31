import api from "@/config/axiosConfig";

import type { Product } from "@/types/product";

import { useEntityStore } from "./useEntityStore";

// custom search function for products
const searchProducts = (products: Product[], term: string) => {
	if (!term) return products;
	return products.filter((p) =>
		p.name.toLowerCase().includes(term.toLowerCase()),
	);
};

// custom sort function for products
const sortProducts = (
	products: Product[],
	config: { key: keyof Product; direction: "asc" | "desc" },
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
	const store = useEntityStore<Product>({
		queryKey: "products",
		fetchFn: async ({ page = 1, pageSize = 10 }) => {
      const res = await api.get("/products", {
        params: { page, pageSize },
      });
      return {
        data: res.data.products ?? [],
        total: res.data.products.length ?? 0,
      };
    },
		createFn: async (product) => {
			const res = await api.post("/products", product);
			return res.data.product; // return the created product from the backend
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

	// remap entity store -> product store
	return {
		// data
		products: store.entities,
		filteredProducts: store.filteredEntities,
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

		// actions (these still trigger toast inside useEntityStore!)
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
