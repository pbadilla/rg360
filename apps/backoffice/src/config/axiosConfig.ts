import axios from "axios";

const API_URL =
  import.meta.env.VITE_ENV === "local"
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("🔗 Axios baseURL:", api.defaults.baseURL);

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    console.log("HTTP Method:", config.method);

    const token = localStorage.getItem("token");

    // Skip Authorization header for /login and other public routes
    const publicRoutes = ["/login", "/register", "/forgot-password"];
    const isPublic = publicRoutes.some((route) => config.url?.includes(route));

    if (!isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Debug logs
    if (config.headers.Authorization) {
      console.log("🔐 Attaching Authorization:", config.headers.Authorization);
    } else {
      console.log("🟢 No Authorization attached (public route)");
    }

    if (
      (config.method === "post" || config.method === "put") &&
      !config.headers["Content-Type"]
    ) {
      config.headers["Content-Type"] = "application/json";
    }

    console.log("Request:", config);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response; // pass the response as-is to next handler
  },
  (error) => {
    if (!error.response) {
      console.error("❌ Network or CORS error:", error.message || error);
      // Optional: comment out alert if annoying
      alert(
        "Network error or CORS issue. Check your internet connection or CORS settings.",
      );
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

    // Pass the error to the next catch block so your components can also handle errors
    return Promise.reject(error);
  },
);
export default api;
