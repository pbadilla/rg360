// utils/handleApiError.ts

import { toast } from "sonner";

import type { NavigateFunction } from "react-router-dom";


export const handleApiError = (err: any, navigate?: NavigateFunction) => {
  const status = err.response?.status;
  const message = err.response?.data?.message || "An error occurred";

  switch (status) {
    case 400:
      toast.error("Bad Request");
      break;
    case 401:
      localStorage.removeItem("token");
      toast.error("Unauthorized - Please log in again");
      if (navigate) navigate("/login");
      break;
    case 403:
      toast.error("Forbidden - You don’t have permission");
      break;
    case 404:
      toast.error("Not Found");
      break;
    case 500:
      toast.error("Internal Server Error");
      break;
    default:
      toast.error(message);
  }
};
