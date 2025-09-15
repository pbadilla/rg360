import { useEntityStore } from "@/store/useEntityStore";

import type { Customer } from "@/types/payments";

import api from "@/config/axiosConfig";
import { searchEntity, sortEntity } from "@/utils/genericUtils";

export const useCustomersStore = () =>
  useEntityStore<Customer>({
    queryKey: "customers",

    // Fetch all customers from backend
    fetchFn: async () => {
      const res = await api.get<{ customers: Customer[] }>("/payments/customers");
      const customers = res.data.customers;
      console.log("Fetched customers:", res.data);
      return { data: customers, total: customers.length };
    },

    // Create a new transaction
    createFn: async (transaction) => {
      const res = await api.post("/payments/customers", transaction);
      return res.data; // backend should return full transaction with id/timestamps
    },

    // Update an existing transaction
    updateFn: async (transaction) => {
      const res = await api.put(`/payments/customers/${transaction.id}`, transaction);
      return res.data;
    },

    // Delete a transaction
    deleteFn: async (id) => {
      await api.delete(`/payments/customers/${id}`);
      return id;
    },

    // Optional import function
    importFn: async (data) => data,

    // Default sort (can adjust key to your Customer fields)
    defaultSort: { key: "date", direction: "desc" },

    // Generic search function
    searchFn: (data, term) =>
      data.filter((item) => searchEntity(item, term, ["customer", "customers", "description"])),


    // Generic sort function
    sortFn: (data, config) =>
      [...data].sort((a, b) => sortEntity(a, b, config.key, config.direction)),
  });
