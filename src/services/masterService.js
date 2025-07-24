import axios from "axios";
import Cookies from "js-cookie";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      Cookies.remove("token");
      Cookies.remove("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const masterService = {
  // Get customers for filter dropdown
  getCustomers: async () => {
    const response = await apiClient.get("/data-master/customers");
    return response.data;
  },

  // Get items for filter dropdown
  getItems: async () => {
    const response = await apiClient.get("/data-master/vegetables");
    return response.data;
  },

  getUnits: async () => {
    const response = await apiClient.get("/data-master/units");
    return response.data;
  },
};
