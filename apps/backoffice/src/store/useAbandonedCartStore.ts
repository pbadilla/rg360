import { useEntityStore } from '@/store/useEntityStore';
import api from '@/config/axiosConfig';
import { AbandonedCart } from '@/types/abandonedCart';

export const useAbandonedCartStore = () =>
  useEntityStore<AbandonedCart>({
    queryKey: 'abandonedCarts',

    fetchFn: async () => {
      const res = await api.get('/abandonedCarts');
      const carts = res.data.abandonedCarts;
      return {
        data: carts,
        total: carts.length,
      };
    },

    createFn: async () => {
      throw new Error('Create not supported for abandoned carts');
    },
    updateFn: async () => {
      throw new Error('Update not supported for abandoned carts');
    },
    deleteFn: async () => {
      throw new Error('Delete not supported for abandoned carts');
    },
    importFn: async () => {
      throw new Error('Import not supported for abandoned carts');
    },

    defaultSort: {
      key: 'createdAt',
      direction: 'desc',
    },

    searchFn: (data: AbandonedCart[], term: string) =>
      data.filter(
        (cart) =>
          cart.user?.toString().includes(term) ||
          cart.status?.toLowerCase().includes(term.toLowerCase())
      ),

    sortFn: (data, { key, direction }) => {
      const sorted = [...data].sort((a, b) => {
        if (key === 'totalAmount' || key === 'reminderCount') {
          return (a[key] as number) - (b[key] as number);
        }
        return String(a[key]).localeCompare(String(b[key]));
      });
      return direction === 'desc' ? sorted.reverse() : sorted;
    },
  });
