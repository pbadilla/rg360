import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_PROD,
  timeout: 10000,
});

// Request interceptor: Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request:", config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Global error handling
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    console.log("Error Response:", error.response);
    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // or router redirect
    }
    return Promise.reject(error);
  }
);

export default api;
