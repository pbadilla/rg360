import { useEntityStore } from "@/store/useEntityStore";
import type { Refund } from "@/types/payments";
import api from "@/config/axiosConfig";
import { searchEntity, sortEntity } from "@/utils/genericUtils";

export const useRefundsStore = () =>
  useEntityStore<Refund>({
    queryKey: "refunds",

    // Fetch all refunds from backend
    fetchFn: async () => {
      const res = await api.get<{ refunds: Refund[] }>("/payments/refunds");
      const refunds = res.data.refunds;
      return { data: refunds, total: refunds.length };
    },

    // Create a new transaction
    createFn: async (transaction) => {
      const res = await api.post("/payments/refunds", transaction);
      return res.data; // backend should return full transaction with id/timestamps
    },

    // Update an existing transaction
    updateFn: async (transaction) => {
      const res = await api.put(`/payments/refunds/${transaction.id}`, transaction);
      return res.data;
    },

    // Delete a transaction
    deleteFn: async (id) => {
      await api.delete(`/payments/refunds/${id}`);
      return id;
    },

    // Optional import function
    importFn: async (data) => data,

    // Default sort (can adjust key to your Refund fields)
    defaultSort: { key: "date", direction: "desc" },

    // Generic search function
    searchFn: (data, term) =>
      data.filter((item) => searchEntity(item, term, ["customer", "refunds", "description"])),


    // Generic sort function
    sortFn: (data, config) =>
      [...data].sort((a, b) => sortEntity(a, b, config.key, config.direction)),
  });
