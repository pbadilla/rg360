import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Adjust base URL to your backend
  timeout: 10000,
});

// Request interceptor: Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token expired / unauthorized
      localStorage.removeItem("token");
      window.location.href = "/login"; // or use router redirect
    }

    return Promise.reject(error);
  }
);

export default api;
