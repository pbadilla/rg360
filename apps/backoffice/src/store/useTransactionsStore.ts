import { useEntityStore } from "@/store/useEntityStore";

import type { TransactionMethod } from "@/types/payments";

import api from "@/config/axiosConfig";
import { searchEntity, sortEntity } from "@/utils/genericUtils";

export const useTransactionsStore = () =>
  useEntityStore<TransactionMethod>({
    queryKey: "transactions",

    // Fetch all transactions from backend
    fetchFn: async () => {
      const res = await api.get<{ transactions: TransactionMethod[] }>("/payments/transactions");
      const transactions = res.data.transactions;
      return { data: transactions, total: transactions.length };
    },

    // Create a new transaction
    createFn: async (transaction) => {
      const res = await api.post("/payments/transactions", transaction);
      return res.data; // backend should return full transaction with id/timestamps
    },

    // Update an existing transaction
    updateFn: async (transaction) => {
      const res = await api.put(`/payments/transactions/${transaction.id}`, transaction);
      return res.data;
    },

    // Delete a transaction
    deleteFn: async (id) => {
      await api.delete(`/payments/transactions/${id}`);
      return id;
    },

    // Optional import function
    importFn: async (data) => data,

    // Default sort (can adjust key to your TransactionMethod fields)
    defaultSort: { key: "date", direction: "desc" },

    // Generic search function
    searchFn: (data, term) =>
      data.filter((item) => searchEntity(item, term, ["customer", "paymentMethod", "description"])),


    // Generic sort function
    sortFn: (data, config) =>
      [...data].sort((a, b) => sortEntity(a, b, config.key, config.direction)),
  });
