import apiClient from "@/utils/apiClient";

export const expensesService = {
  getExpenses: async (params = {}) => {
    const { page = 1, limit = 10, startDate = "", endDate = "", sort_order = "desc" } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      sort_order,
    });

    const response = await apiClient.get(`/expenses?${queryParams}`);
    return response.data;
  },
  createExpenses: async (expensesData) => {
    const response = await apiClient.post("/expenses", expensesData);
    return response.data;
  },
  deleteExpenses: async (id) => {
    const response = await apiClient.delete(`/expenses/${id}`);
    return response.data;
  },
  importExpenses: async (file) => {
    const formData = new FormData();
    formData.append("SakuTani", file);

    const response = await apiClient.post("/excel/import-expenses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
