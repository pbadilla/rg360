import { useEntityStore } from "@/store/useEntityStore";

import type { ShippingMethod } from "@/types/shippingMethod";

import api from "@/config/axiosConfig";


export const useShippingMethodStore = () =>
  useEntityStore<ShippingMethod>({
    queryKey: "shippings",
    fetchFn: async ({ page = 1, pageSize = 10 }) => {
      const res = await api.get("/shippings", { params: { page, pageSize } });

      // ✅ res.data is already the array
      const data: ShippingMethod[] = Array.isArray(res.data) ? res.data : [];

      return {
        data,
        total: data.length,
      };
    },
    createFn: async (method: Omit<ShippingMethod, "_id">) => {
      const res = await api.post("/shippings", method);
      return res.data;
    },
    updateFn: async (method: ShippingMethod) => {
      const res = await api.put(`/shippings/${method._id}`, method);
      return res.data;
    },
    deleteFn: async (id: string) => {
      await api.delete(`/shippings/${id}`);
      return id;
    },
    importFn: async (data: ShippingMethod[]) => data,
    defaultSort: {
      key: "createdAt",
      direction: "desc",
    },
    searchFn: (methods, term) =>
      term
        ? methods.filter(
            (m) =>
              m.name.toLowerCase().includes(term.toLowerCase()) ||
              m.carrier.toLowerCase().includes(term.toLowerCase()) ||
              m.description.toLowerCase().includes(term.toLowerCase()),
          )
        : methods,
    sortFn: (methods, config) =>
      [...methods].sort((a, b) => {
        const valA = a[config.key] ?? "";
        const valB = b[config.key] ?? "";
        if (valA < valB) return config.direction === "asc" ? -1 : 1;
        if (valA > valB) return config.direction === "asc" ? 1 : -1;
        return 0;
      }),
  });