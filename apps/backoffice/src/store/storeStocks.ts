import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/config/axiosConfig';
import { useState, useMemo } from 'react';
import { Stock } from '@/types/stock';

import { searchStocks, sortStocks } from '@/utils/stockUtils';
import { toast } from 'sonner';

const STOCKS_QUERY_KEY = ['stocks'];

type ViewMode = 'grid' | 'list';
type SortConfig = {
  key: keyof Stock;
  direction: 'asc' | 'desc';
};

export const useStockStore = () => {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',  // or any default key of Stock
    direction: 'asc',
  });
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const {
    data: stocks = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: STOCKS_QUERY_KEY,
    queryFn: async () => {
      const response = await api.get('/stocks');
      return response.data.stocks ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const filteredStocks = useMemo(() => {
    const searched = searchStocks(stocks, searchTerm);
    return sortStocks(searched, sortConfig);
  }, [stocks, searchTerm, sortConfig]);

  const deleteStockMutation = useMutation({
    mutationFn: async (id: string) => {
      // await api.delete(`/stocks/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(STOCKS_QUERY_KEY, (old: Stock[] = []) =>
        old.filter(stock => stock.id !== deletedId)
      );
      toast.success('Stock deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete stock');
      console.error('Delete error:', error);
    }
  });

  const editStockMutation = useMutation({
    mutationFn: async (stock: Stock) => {
      // await api.put(`/stocks/${stock.id}`, stock);
      return stock;
    },
    onSuccess: (updatedStock) => {
      queryClient.setQueryData(STOCKS_QUERY_KEY, (old: Stock[] = []) =>
        old.map(stock => stock.id === updatedStock.id ? updatedStock : stock)
      );
      toast.success('Stock updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update stock');
      console.error('Update error:', error);
    }
  });

  const addStockMutation = useMutation({
    mutationFn: async (stock: Omit<Stock, 'id'>) => {
      // const response = await api.post('/stocks', stock);
      // return response.data;
      const newStock = { ...stock, id: Date.now().toString() };
      return newStock;
    },
    onSuccess: (newStock) => {
      queryClient.setQueryData(STOCKS_QUERY_KEY, (old: Stock[] = []) => [...old, newStock]);
      toast.success('Stock added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add stock');
      console.error('Add error:', error);
    }
  });

  const importCSVMutation = useMutation({
    mutationFn: async (data: Stock[]) => {
      // await api.post('/stocks/import', data);
      return data;
    },
    onSuccess: (importedData) => {
      queryClient.setQueryData(STOCKS_QUERY_KEY, importedData);
      toast.success('CSV data imported successfully');
    },
    onError: (error) => {
      toast.error('Failed to import CSV data');
      console.error('Import error:', error);
    }
  });

  return {
    stocks,
    filteredStocks,
    loading,
    error,
    
    searchTerm,
    sortConfig,
    viewMode,
    
    setSearchTerm,
    setSortConfig,
    setViewMode,
    
    deleteStock: deleteStockMutation.mutate,
    editStock: editStockMutation.mutate,
    addStock: addStockMutation.mutate,
    importCSVData: importCSVMutation.mutate,

    isDeleting: deleteStockMutation.isPending,
    isEditing: editStockMutation.isPending,
    isAdding: addStockMutation.isPending,
    isImporting: importCSVMutation.isPending,
  };
};
