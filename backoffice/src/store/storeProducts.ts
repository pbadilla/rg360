import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/types/product';


const getStoreKeyByTitle = (title: string) => {
  return ['products', title];
};

export function useStoreProducts() {
  const queryClient = useQueryClient();

  return useMutation<Product[], Error, { data: Product[], title: string }>({
    mutationFn: async ({ data }) => {
      return Promise.resolve(data);
    },
    onSuccess: (data, { title }) => {
      const queryKey = getStoreKeyByTitle(title);
      queryClient.setQueryData(queryKey, data);
    },
  });
}
