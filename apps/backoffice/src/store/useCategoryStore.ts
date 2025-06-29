import { useEntityStore } from '@/hooks/useEntityStore';
import api from '@/config/axiosConfig';
import { Category } from '@/types/category';
import { searchCategory, sortCategory } from '@/utils/categoryUtils';

export const useCategoryStore = () =>
  useEntityStore<Category>({
    queryKey: 'categories',
    fetchFn: async () => {
      const res = await api.get('/categories');
      const categories = res.data.categories;
      return {
        data: categories,
        total: categories.length, // or from server, if available
      };
    },
    createFn: async (category) => {
      return { ...category, id: Date.now().toString() };
    },
    updateFn: async (category) => category,
    deleteFn: async (id) => id,
    importFn: async (data) => data,
    defaultSort: {
      key: 'name',
      direction: 'asc'
    },
    searchFn: searchCategory,
    sortFn: sortCategory
  });
