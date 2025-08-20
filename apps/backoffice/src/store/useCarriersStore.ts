import { useEntityStore } from "@/store/useEntityStore";

import api from "@/config/axiosConfig";

import type { Carrier} from "@/types/carriers";

export const useCarriersStore = () =>
  useEntityStore<Carrier>({
    queryKey: "carriers",
    fetchFn: async ({ page = 1, pageSize = 10 }) => {
      const res = await api.get("/carriers", { params: { page, pageSize } });

      console.log("res", res);

      let rawCarriers = res.data?.carriers ?? [];

      let carriers: Carrier[] = [];
      if (Array.isArray(rawCarriers) && rawCarriers.length > 0) {
        const first = rawCarriers[0];
        if (typeof first === "object" && first !== null) {
          carriers = Object.values(first).filter(
            (v): v is Carrier => typeof v === "object" && v !== null && "id" in v
          );
        }
      }

      console.log("carriers", carriers);

      return {
        data: carriers,
        total: carriers.length,
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