// useEntityStore.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';

type ViewMode = 'grid' | 'list';
type SortDirection = 'asc' | 'desc';

interface EntityStoreOptions<T extends { id: string }> {
  queryKey: string;
  fetchFn: () => Promise<T[]>;
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

  const {
    data: entities = [],
    isLoading,
    error
  } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchFn,
    staleTime: 5 * 60 * 1000
  });

  const filteredEntities = useMemo(() => {
    const searched = searchFn(entities, searchTerm);
    return sortFn(searched, sortConfig);
  }, [entities, searchTerm, sortConfig]);

  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: (deletedId) => {
      queryClient.setQueryData([queryKey], (old: T[] = []) => old.filter(item => item.id !== deletedId));
      toast.success(`${queryKey} deleted`);
    },
    onError: () => toast.error(`Failed to delete ${queryKey}`)
  });

  const updateMutation = useMutation({
    mutationFn: updateFn,
    onSuccess: (updatedItem) => {
      queryClient.setQueryData([queryKey], (old: T[] = []) =>
        old.map(item => (item.id === updatedItem.id ? updatedItem : item))
      );
      toast.success(`${queryKey} updated`);
    },
    onError: () => toast.error(`Failed to update ${queryKey}`)
  });

  const createMutation = useMutation({
    mutationFn: createFn,
    onSuccess: (newItem) => {
      queryClient.setQueryData([queryKey], (old: T[] = []) => [...old, newItem]);
      toast.success(`${queryKey} added`);
    },
    onError: () => toast.error(`Failed to add ${queryKey}`)
  });

  const importMutation = useMutation({
    mutationFn: importFn,
    onSuccess: (importedItems) => {
      queryClient.setQueryData([queryKey], importedItems);
      toast.success(`${queryKey} imported`);
    },
    onError: () => toast.error(`Failed to import ${queryKey}`)
  });

  return {
    entities,
    filteredEntities,
    isLoading,
    error,
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
