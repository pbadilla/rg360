import { useEntityStore } from "@/store/useEntityStore";

import type { PaymentMethod } from "@/types/payments";

import api from "@/config/axiosConfig";
import { searchPaymentMethod, sortPaymentMethod } from "@/utils/paymentsUtils";

export const usePaymentMethodStore = () =>
  useEntityStore<PaymentMethod>({
    queryKey: "payments",
    fetchFn: async () => {
      const res = await api.get("/payments");
      const methods = res.data.payments;
      console.log("fres.data", methods);
      return { data: methods, total: methods.length };
    },
    createFn: async (method) => {
      const res = await api.post("/payments", method);
      return res.data; // should include id, timestamps from backend
    },
    updateFn: async (method) => {
      const res = await api.put(`/payments/${method.id}`, method);
      return res.data;
    },
    deleteFn: async (id) => {
      await api.delete(`/payments/${id}`);
      return id;
    },
    importFn: async (data) => data,
    defaultSort: { key: "brand", direction: "asc" },
    searchFn: (data, term) =>
      data.filter((m) => searchPaymentMethod(m, term)),
    sortFn: (data, config) =>
      [...data].sort((a, b) =>
        sortPaymentMethod(a, b, config.key as string, config.direction)
      ),
  });