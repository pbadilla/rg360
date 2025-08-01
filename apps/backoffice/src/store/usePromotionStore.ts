import { useEntityStore } from '@/hooks/useEntityStore';
import api from '@/config/axiosConfig';
import { Promotion } from '@/types/promotion';
import { searchPromotion, sortPromotion } from '@/utils/promotionUtils';

export const usePromotionStore = () =>
  useEntityStore<Promotion>({
    queryKey: 'promotions',
    fetchFn: async () => {
      const res = await api.get('/promotions');
      const promotions = res.data.promotions;
      return {
        data: promotions,
        total: promotions.length,
      };
    },
    createFn: async (promotion) => {
      return { ...promotion, id: Date.now().toString() }; // Mock creation
    },
    updateFn: async (promotion) => promotion,
    deleteFn: async (id) => id,
    importFn: async (data) => data,
    defaultSort: {
      key: 'title',
      direction: 'asc'
    },
    searchFn: (data, term) => data.filter(promotion => searchPromotion(promotion, term)),
    sortFn: (data, config) =>
      [...data].sort((a, b) =>
        sortPromotion(a, b, config.key as string, config.direction)
      )
  });