// useEntityStore.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';

type ViewMode = 'grid' | 'list';
type SortDirection = 'asc' | 'desc';

interface EntityStoreOptions<T extends { id: string }> {
  queryKey: string;
  fetchFn: (params?: { page?: number; pageSize?: number }) => Promise<{ data: T[]; total: number }>;
  createFn?: (item: Omit<T, 'id'>) => Promise<T>;
  updateFn?: (item: T) => Promise<T>;
  deleteFn?: (id: string) => Promise<string>;
  importFn?: (data: T[]) => Promise<T[]>;
  defaultSort?: {
    key: keyof T;
    direction: SortDirection;
  };
  searchFn: (data: T[], term: string) => T[];
  sortFn: (data: T[], config: { key: keyof T; direction: SortDirection }) => T[];
}

export const useEntityStore = <T extends { id: string }>(options: EntityStoreOptions<T>) => {
  const {
    queryKey,
    fetchFn,
    createFn,
    updateFn,
    deleteFn,
    importFn,
    defaultSort = { key: 'id', direction: 'asc' },
    searchFn,
    sortFn,
  } = options;

  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(defaultSort);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: [queryKey, page, pageSize],
    queryFn: () => fetchFn({ page, pageSize }),
    staleTime: 5 * 60 * 1000,
  });

  const entities = data?.data ?? [];

  useEffect(() => {
    setTotal(data?.total ?? 0);
  }, [data?.total]);

  const filteredEntities = useMemo(() => {
    const searched = searchFn(entities, searchTerm);
    return sortFn(searched, sortConfig);
  }, [entities, searchTerm, sortConfig]);

  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: (deletedId) => {
      queryClient.setQueryData([queryKey, page, pageSize], (old?: { data: T[]; total: number }) => ({
        ...old,
        data: old?.data.filter(item => item.id !== deletedId) ?? [],
      }));
      toast.success(`${queryKey} deleted`);
    },
    onError: () => toast.error(`Failed to delete ${queryKey}`)
  });

  const updateMutation = useMutation({
    mutationFn: updateFn,
    onSuccess: (updatedItem) => {
      queryClient.setQueryData([queryKey, page, pageSize], (old?: { data: T[]; total: number }) => ({
        ...old,
        data: old?.data.map(item => (item.id === updatedItem.id ? updatedItem : item)) ?? [],
      }));
      toast.success(`${queryKey} updated`);
    },
    onError: () => toast.error(`Failed to update ${queryKey}`)
  });

  const createMutation = useMutation({
    mutationFn: createFn,
    onSuccess: (newItem) => {
      queryClient.setQueryData([queryKey, page, pageSize], (old?: { data: T[]; total: number }) => ({
        ...old,
        data: old ? [...old.data, newItem] : [newItem],
        total: (old?.total ?? 0) + 1,
      }));
      toast.success(`${queryKey} added`);
    },
    onError: () => toast.error(`Failed to add ${queryKey}`)
  });

  const importMutation = useMutation({
    mutationFn: importFn,
    onSuccess: (importedItems) => {
      queryClient.setQueryData([queryKey, page, pageSize], {
        data: importedItems,
        total: importedItems.length
      });
      toast.success(`${queryKey} imported`);
    },
    onError: () => toast.error(`Failed to import ${queryKey}`)
  });

  return {
    entities,
    filteredEntities,
    total,
    page,
    pageSize,
    isLoading,
    error,
    setPage,
    setPageSize,
    searchTerm,
    sortConfig,
    viewMode,
    setSearchTerm,
    setSortConfig,
    setViewMode,
    deleteEntity: deleteMutation.mutate,
    editEntity: updateMutation.mutate,
    addEntity: createMutation.mutate,
    importEntities: importMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isEditing: updateMutation.isPending,
    isAdding: createMutation.isPending,
    isImporting: importMutation.isPending
  };
};
