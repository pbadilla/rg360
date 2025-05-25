import { useState, useEffect } from "react";
import apiClient from "@/config/axiosConfig";

interface CsvEntry {
  [key: string]: string;
}

const parseCsv = (csvText: string): CsvEntry[] => {
  const lines = csvText.split("\n").slice(1); // Remove first row
  const headers = lines.shift()?.split(";") || []; // Get headers

  return lines.map((line) => {
    const values = line.split(";");
    let entry: CsvEntry = {};
    headers.forEach((header, index) => {
      entry[header] = values[index] || "";
    });
    return entry;
  });
};

export const useCsvData = () => {
  const [data, setData] = useState<CsvEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("UniverskateStock.csv");
        const text = await response.data.text();
        setData(parseCsv(text));
      } catch (err) {
        setError("Error fetching CSV data");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};
