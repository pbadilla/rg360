import { useEntityStore } from "@/store/useEntityStore";

import type { ShippingMethod } from "@/types/shippingMethod";

import api from "@/config/axiosConfig";

export const useShippingMethodStore = () =>
  useEntityStore<ShippingMethod>({
    queryKey: "shippings",

    fetchFn: async ({ page = 1, pageSize = 10 }) => {
      // This matches GET /
      const res = await api.get("/shippings", {
        params: { page, pageSize },
      });

      return {
        data: res.data.shippingMethods ?? [],
        total: res.data.total ?? 0,
      };
    },

    createFn: async (shippingMethod) => {
      // Matches POST /addShipping
      const res = await api.post("/shippings/addShipping", shippingMethod);
      return res.data;
    },

    updateFn: async (shippingMethod) => {
      // Matches POST /updateShipping (or PATCH if you want partial)
      const res = await api.post("/shippings/updateShipping", shippingMethod);
      return res.data;
    },

    deleteFn: async (id) => {
      // Matches DELETE / with body { id }
      await api.delete("/shippings", { data: { id } });
      return id;
    },

    importFn: async (data) => {
      // You don't have an import route in backend — either remove or add one
      return data;
    },

    defaultSort: {
      key: "name",
      direction: "asc",
    },

    searchFn: (items, searchTerm) =>
      items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),

    sortFn: (items, { key, direction }) => {
      return [...items].sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (valA < valB) return direction === "asc" ? -1 : 1;
        if (valA > valB) return direction === "asc" ? 1 : -1;
        return 0;
      });
    },
  });
