import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_PROD,
  timeout: 10000
});

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request:", config);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    // Network error / CORS failure / Timeout
    if (!error.response) {
      console.error("❌ Network error or CORS failure:", error.message || error);
      alert("Network error or CORS issue. Check your internet connection or CORS settings.");
      return Promise.reject(error);
    }

    const status = error.response.status;
    console.error("Error Response:", error.response);

    switch (status) {
      case 400:
        console.warn("⚠️ Bad request");
        break;
      case 401:
        console.warn("🔐 Unauthorized - logging out");
        localStorage.removeItem("token");
        window.location.href = "/login";
        break;
      case 403:
        console.warn("⛔ Forbidden");
        break;
      case 404:
        console.warn("🔍 Not Found");
        break;
      case 500:
        console.warn("💥 Internal Server Error");
        break;
      default:
        console.warn("❓ Unhandled error status:", status);
    }

    return Promise.reject(error);
  }
);

export default api;
