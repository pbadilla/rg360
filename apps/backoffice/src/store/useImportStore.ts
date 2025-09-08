import { useState } from "react";
import api from "@/config/axiosConfig";

interface ImportResult {
  success: boolean;
  count?: number;
  error?: string;
  timestamp: string;
  type: 'universkate' | 'rollerblade' | 'all' | 'csv';
  products?: any[];
}

export const useImportStore = () => {
  const [loading, setLoading] = useState(false);
  const [lastImportResult, setLastImportResult] = useState<ImportResult | null>(null);
  const [importHistory, setImportHistory] = useState<ImportResult[]>([]);

  const handleImportResult = (result: any, type: ImportResult['type']) => {
    const importResult: ImportResult = {
      success: !!result?.success || !!result?.data || !result?.error,
      count: result?.count || result?.data?.length || result?.products?.length || 0,
      error: result?.error || result?.message,
      timestamp: new Date().toISOString(),
      type,
      products: result?.data || result?.products || []
    };

    setLastImportResult(importResult);
    setImportHistory(prev => [importResult, ...prev.slice(0, 9)]); // Keep last 10 imports
    
    return importResult;
  };

  const importUniverskate = async () => {
    setLoading(true);
    try {
      const res = await api.get("/importUniverskate");
      const result = handleImportResult(res.data, 'universkate');
      return result;
    } catch (error: any) {
      const result = handleImportResult({
        success: false,
        error: error.response?.data?.message || error.message || 'Import failed'
      }, 'universkate');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const importRollerblade = async () => {
    setLoading(true);
    try {
      const res = await api.get("/importRollerblade");
      const result = handleImportResult(res.data, 'rollerblade');
      return result;
    } catch (error: any) {
      const result = handleImportResult({
        success: false,
        error: error.response?.data?.message || error.message || 'Import failed'
      }, 'rollerblade');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const importAll = async () => {
    setLoading(true);
    try {
      const res = await api.get("/import");
      const result = handleImportResult(res.data, 'all');
      return result;
    } catch (error: any) {
      const result = handleImportResult({
        success: false,
        error: error.response?.data?.message || error.message || 'Import failed'
      }, 'all');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const importCSV = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await api.post("/importCSV", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const result = handleImportResult(res.data, 'csv');
      return result;
    } catch (error: any) {
      const result = handleImportResult({
        success: false,
        error: error.response?.data?.message || error.message || 'CSV import failed'
      }, 'csv');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearImportHistory = () => {
    setImportHistory([]);
    setLastImportResult(null);
  };

  return {
    loading,
    lastImportResult,
    importHistory,
    importUniverskate,
    importRollerblade,
    importAll,
    importCSV,
    clearImportHistory,
  };
};