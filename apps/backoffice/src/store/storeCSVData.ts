import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CSVData } from "@/utils/csvUtils";

const storeCSVData = (parsedData: CSVData) => {
  return parsedData;
};

const getStoreKeyByTitle = (title: string) => {
  return ["csvData", title];
};

export function useStoreCSVData() {
  const queryClient = useQueryClient();

  return useMutation<CSVData, Error, { parsedData: CSVData; title: string }>({
    mutationFn: ({ parsedData }) => Promise.resolve(storeCSVData(parsedData)),
    onSuccess: (data, variables) => {
      const { title } = variables;
      const queryKey = getStoreKeyByTitle(title);
      queryClient.setQueryData(queryKey, data);
    },
  });
}
