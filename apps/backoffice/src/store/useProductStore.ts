// useProductStore.ts
import { useEntityStore } from '@/store/useEntityStore';
import api from '@/config/axiosConfig';
import { Product } from '@/types/product';
import { searchProducts, sortProducts } from '@/utils/productUtils';

export const useProductStore = () =>
  useEntityStore<Product>({
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
    searchFn: searchProducts,
    sortFn: sortProducts
  });
