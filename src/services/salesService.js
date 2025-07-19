// services/salesService.js
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

export const salesService = {
  // Get sales data with pagination and filters
  getSales: async (params = {}) => {
    const { page = 1, limit = 10, customer = "", item_name = "", startDate = "", endDate = "", sort_by = "date", sort_order = "desc" } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(customer && { customer }),
      ...(item_name && { item_name }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      sort_by,
      sort_order,
    });

    const response = await apiClient.get(`/sales?${queryParams}`);
    return response.data;
  },

  // Get single sales record
  getSaleById: async (id) => {
    const response = await apiClient.get(`/sales/${id}`);
    return response.data;
  },

  // Create new sales record
  createSale: async (saleData) => {
    const response = await apiClient.post("/sales", saleData);
    return response.data;
  },

  // Update sales record
  updateSale: async (id, saleData) => {
    const response = await apiClient.put(`/sales/${id}`, saleData);
    return response.data;
  },

  // Delete sales record
  deleteSale: async (id) => {
    const response = await apiClient.delete(`/sales/${id}`);
    return response.data;
  },

  // Import sales data
  importSales: async (file) => {
    const formData = new FormData();
    formData.append("SakuTani", file);

    const response = await apiClient.post("/excel/import-sales", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

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
};
