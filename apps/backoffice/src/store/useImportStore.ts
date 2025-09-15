import { useState } from "react";

import api from "@/config/axiosConfig";

interface UnifiedImportResult {
  success?: boolean;
  count?: number;
  error?: string;
  message?: string;
  timestamp?: string;
  type?: 'universkate' | 'rollerblade' | 'all' | 'csv';
  data?: unknown[];
  products?: unknown[];
}

export const useImportStore = () => {
  const [loading, setLoading] = useState(false);
  const [lastImportResult, setLastImportResult] = useState<UnifiedImportResult | null>(null);
  const [importHistory, setImportHistory] = useState<UnifiedImportResult[]>([]);

  const handleImportResult = (result: UnifiedImportResult, type: UnifiedImportResult['type']) => {
    const importResult: UnifiedImportResult = {
      success: !!result?.success || !!result?.data || !result?.error,
      count: result?.count || (Array.isArray(result?.data) ? result.data.length : 0) || (Array.isArray(result?.products) ? result.products.length : 0) || 0,
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
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }, message?: string };
      const result = handleImportResult({
        success: false,
        error: err.response?.data?.message || err.message || 'Import failed'
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
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }, message?: string };
      const result = handleImportResult({
        success: false,
        error: err.response?.data?.message || err.message || 'Import failed'
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
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }, message?: string };
      const result = handleImportResult({
        success: false,
        error: err.response?.data?.message || err.message || 'Import failed'
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
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }, message?: string };
      const result = handleImportResult({
        success: false,
        error: err.response?.data?.message || err.message || 'CSV import failed'
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