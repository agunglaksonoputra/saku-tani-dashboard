import apiClient from "@/utils/apiClient";

export const profitShareService = {
  getProfitShare: async () => {
    const response = await apiClient.get(`/withdraw`);
    return response.data;
  },

  getOwnerBalance: async () => {
    const response = await apiClient.get(`/user-balance`);
    return response.data;
  },

  createWithdraw: async (withdrawData) => {
    const response = await apiClient.post("/withdraw", withdrawData);
    return response.data;
  },

  deleteWithdraw: async (id) => {
    const response = await apiClient.delete(`/withdraw/${id}`);
    return response.data;
  },
};
