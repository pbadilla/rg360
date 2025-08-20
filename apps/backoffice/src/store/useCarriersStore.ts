import { useEntityStore } from "@/store/useEntityStore";

import api from "@/config/axiosConfig";

import type { Carrier} from "@/types/carriers";

export const useCarriersStore = () =>
  useEntityStore<Carrier>({
    queryKey: "carriers",
    fetchFn: async ({ page = 1, pageSize = 10 }) => {
      const res = await api.get("/carriers", { params: { page, pageSize } });

      // ✅ res.data is already the array
      const data: Carrier[] = Array.isArray(res.data) ? res.data : [];

      return {
        data,
        total: data.length,
      };
    },
    createFn: async (method: Omit<Carrier, "_id">) => {
      const res = await api.post("/carriers", method);
      return res.data;
    },
    updateFn: async (method: Carrier) => {
      const res = await api.put(`/carriers/${method._id}`, method);
      return res.data;
    },
    deleteFn: async (id: string) => {
      await api.delete(`/carriers/${id}`);
      return id;
    },
    importFn: async (data: Carrier[]) => data,
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