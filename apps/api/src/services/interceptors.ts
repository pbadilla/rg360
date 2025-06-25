
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.patinesbarcelona.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

import type { InternalAxiosRequestConfig } from "axios";

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
