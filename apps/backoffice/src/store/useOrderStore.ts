import { useEntityStore } from '@/store/useEntityStore';
import api from '@/config/axiosConfig';
import { Order } from '@/types/orders';
// import { searchOrder, sortOrder } from '@/utils/orderUtils';

export const useOrderStore = () =>
  useEntityStore<Order>({
    queryKey: 'orders',
    fetchFn: async ({ page = 1, pageSize = 10 }) => {
      const res = await api.get('/orders', {
        params: { page, pageSize }
      });
      return {
        data: res.data.orders ?? [],
        total: res.data.total ?? 0
      };
    },
    createFn: async (order) => {
      return { ...order, id: Date.now().toString() };
    },
    updateFn: async (order) => order,
    deleteFn: async (id) => id,
    importFn: async (data) => data,
    defaultSort: {
      key: 'createdAt', // or another valid Order property key
      direction: 'desc'
    },
    searchFn: (orders, term) => orders, // Provide a default search function or import your own
    sortFn: (orders) => orders // Provide a default sort function or import your own
  });
