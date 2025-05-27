// axiosInstance.js
import axios from 'axios';

// Create instance
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // <-- Change this to your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: add auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(`[Request] ${config.method.toUpperCase()} ${config.url}`, config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('[Response]', response);
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error(`[Error] ${error.response.status}: ${error.response.data.message || 'Something went wrong'}`);
    } else {
      console.error('[Network Error]', error.message);
    }
    return Promise.reject(error);
  }
);

// Export HTTP verbs as functions
const api = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  patch: (url, data, config = {}) => axiosInstance.patch(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
};

export default api;
