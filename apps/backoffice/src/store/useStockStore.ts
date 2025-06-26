import { useEntityStore } from '@/hooks/useEntityStore';
import api from '@/config/axiosConfig';
import { Stock } from '@/types/stock';
import { searchStock, sortStock } from '@/utils/stockUtils';

export const useStockStore = () =>
  useEntityStore<Stock>({
    queryKey: 'products',
    fetchFn: async () => {
      const res = await api.get('/products');
      return res.data.products ?? [];
    },
    createFn: async (product) => {
      return { ...product, id: Date.now().toString() };
    },
    updateFn: async (product) => product,
    deleteFn: async (id) => id,
    importFn: async (data) => data,
    defaultSort: {
      key: 'name',
      direction: 'asc'
    },
    searchFn: searchStock,
    sortFn: sortStock
  });
