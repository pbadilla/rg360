import { useEntityStore } from "@/store/useEntityStore";

import type { Stock } from "@/types/stock";

import api from "@/config/axiosConfig";
import { searchStock, sortStock } from "@/utils/stockUtils";

export const useStockStore = () =>
  useEntityStore<Stock>({
    queryKey: "products",
    fetchFn: async ({ page = 1, pageSize = 10 }) => {
      const res = await api.get("/products", { params: { page, pageSize } });
      return {
        data: res.data.products ?? [],
        total: res.data.total,
      };
    },
    createFn: async (product) => {
      return { ...product, id: Date.now().toString() };
    },
    updateFn: async (product) => product,
    deleteFn: async (id) => id,
    importFn: async (data) => data,
    defaultSort: {
      key: "name",
      direction: "asc",
    },
    searchFn: searchStock,
    sortFn: sortStock,
  });
