// axiosConfig.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_CSV_URL,
  responseType: 'blob',
});

apiClient.interceptors.request.use((config) => {
  config.auth = {
    username: process.env.REACT_APP_CSV_USERNAME || '',
    password: process.env.REACT_APP_CSV_PASSWORD || '',
  };
  return config;
}, (error) => Promise.reject(error));

export default apiClient;