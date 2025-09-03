import { useState } from "react";
import api from "@/config/axiosConfig";

export const useImportStore = () => {
  const [loading, setLoading] = useState(false);

  const importUniverskate = async () => {
    setLoading(true);
    try {
      const res = await api.post("/importUniverskate");
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const importRollerblade = async () => {
    setLoading(true);
    try {
      const res = await api.post("/importRollerblade");
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const importAll = async () => {
    setLoading(true);
    try {
      const res = await api.post("/import");
      return res.data;
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
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    importUniverskate,
    importRollerblade,
    importAll,
    importCSV,
  };
};
