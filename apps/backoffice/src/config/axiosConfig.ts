import axios from "axios";

const API_URL =
  import.meta.env.VITE_ENV === "local"
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;

// Track request timing without extending types
const requestTimings = new Map();

// Debug environment variables
console.log("🌍 Environment:", import.meta.env.VITE_ENV);
console.log("🔗 API_URL:", API_URL);
console.log("📍 Local URL:", import.meta.env.VITE_API_URL_LOCAL);
console.log("🌐 Prod URL:", import.meta.env.VITE_API_URL_PROD);

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500; // Don't throw for 4xx errors
  },
});

console.log("🔗 Axios baseURL:", api.defaults.baseURL);

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const requestId = `${config.method}-${config.url}-${Date.now()}`;
    const startTime = Date.now();
    
    // Store timing info using request ID
    requestTimings.set(requestId, startTime);
    
    // Store request ID in config for later retrieval
    config.requestId = requestId;

    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);

    const token = localStorage.getItem("token");

    // Skip Authorization header for public routes
    const publicRoutes = ["/login", "/register", "/forgot-password"];
    const isPublic = publicRoutes.some((route) => config.url?.includes(route));

    if (!isPublic && token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔐 Token attached");
    } else if (!isPublic && !token) {
      console.warn("⚠️ No token found for protected route");
    } else {
      console.log("🟢 Public route - no token needed");
    }

    // Fix Content-Type logic - don't override if already set
    if (
      (config.method === "post" || config.method === "put") &&
      config.data &&
      !config.headers["Content-Type"]
    ) {
      config.headers["Content-Type"] = "application/json";
    }

    // Special handling for FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"]; // Let browser set boundary
      console.log("📎 FormData detected - removing Content-Type");
    }

    console.log("📤 Request config:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      timeout: config.timeout,
    });

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const requestId = response.config.requestId;
    const startTime = requestTimings.get(requestId);
    const duration = startTime ? Date.now() - startTime : "unknown";
    
    // Clean up timing info
    if (requestId) {
      requestTimings.delete(requestId);
    }
    
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`);
    
    return response;
  },
  (error) => {
    // Calculate request duration if available
    const timingData = error.config ? requestTimings.get(error.config) : null;
    const duration = timingData ? Date.now() - timingData.startTime : 'unknown';

    // Handle network errors (no response)
    if (!error.response) {
      console.error(`❌ Network Error (${duration}ms):`, {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        method: error.config?.method,
      });

      // More specific error messages
      if (error.code === 'ECONNABORTED') {
        console.error('⏰ Request timed out after', error.config?.timeout, 'ms');
        // Only show alert in development
        if (import.meta.env.DEV) {
          alert(`Request timed out. The server might be slow or unreachable.`);
        }
      } else if (error.message.includes('Network Error')) {
        console.error('🌐 Network connectivity issue');
        if (import.meta.env.DEV) {
          alert('Network error. Check your internet connection or server status.');
        }
      }

      return Promise.reject({
        ...error,
        message: error.code === 'ECONNABORTED' 
          ? 'Request timed out. Please try again.' 
          : 'Network error. Please check your connection.',
      });
    }

    // Handle HTTP errors (with response)
    const status = error.response.status;
    console.error(`❌ HTTP ${status} (${duration}ms):`, {
      url: error.config?.url,
      method: error.config?.method,
      status: status,
      data: error.response.data,
    });

    switch (status) {
      case 400:
        console.warn("⚠️ Bad Request - Check your request data");
        break;
      case 401:
        console.warn("🔐 Unauthorized - Logging out");
        localStorage.removeItem("token");
        // Avoid redirect loops
        if (!window.location.pathname.includes('/login')) {
          window.location.href = "/login";
        }
        break;
      case 403:
        console.warn("⛔ Forbidden - Insufficient permissions");
        break;
      case 404:
        console.warn("🔍 Not Found - Check the endpoint URL");
        break;
      case 422:
        console.warn("📝 Validation Error - Check your input data");
        break;
      case 429:
        console.warn("🐌 Rate Limited - Too many requests");
        break;
      case 500:
        console.warn("💥 Internal Server Error - Server issue");
        break;
      case 502:
        console.warn("🚪 Bad Gateway - Server is down");
        break;
      case 503:
        console.warn("🔧 Service Unavailable - Server maintenance");
        break;
      default:
        console.warn("❓ Unhandled error status:", status);
    }

    return Promise.reject(error);
  }
);

// Add a helper function for debugging
api.interceptors.request.use((config) => {
  // Log full request URL for debugging
  const fullUrl = `${config.baseURL}${config.url}`;
  console.log("🎯 Full request URL:", fullUrl);
  
  // Validate baseURL
  if (!config.baseURL || config.baseURL === 'undefined') {
    console.error("❌ Invalid baseURL:", config.baseURL);
    console.error("Check your environment variables:");
    console.error("VITE_ENV:", import.meta.env.VITE_ENV);
    console.error("VITE_API_URL_LOCAL:", import.meta.env.VITE_API_URL_LOCAL);
    console.error("VITE_API_URL_PROD:", import.meta.env.VITE_API_URL_PROD);
  }
  
  return config;
});

export default api;