import apiClient from "@/utils/apiClient";

export const salesService = {
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

  getSaleById: async (id) => {
    const response = await apiClient.get(`/sales/${id}`);
    return response.data;
  },

  createSale: async (saleData) => {
    const response = await apiClient.post("/sales", saleData);
    return response.data;
  },

  updateSale: async (id, saleData) => {
    const response = await apiClient.put(`/sales/${id}`, saleData);
    return response.data;
  },

  deleteSale: async (id) => {
    const response = await apiClient.delete(`/sales/${id}`);
    return response.data;
  },

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

  getCustomers: async () => {
    const response = await apiClient.get("/data-master/customers");
    return response.data;
  },

  getItems: async () => {
    const response = await apiClient.get("/data-master/vegetables");
    return response.data;
  },
};
