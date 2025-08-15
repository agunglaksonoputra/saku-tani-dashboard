import apiClient from "@/utils/apiClient";

export const reportService = {
  getReport: async () => {
    const response = await apiClient.get(`/v2/report`);
    return response.data;
  },

  exportReport: async () => {
    const response = await apiClient.get(`/excel/export`, {
      responseType: "blob",
    });
    return response;
  },

  getReportCurent: async () => {
    const response = await apiClient.get(`/report/current`);
    return response.data;
  },

  getMonthlyReport: async () => {
    const response = await apiClient.get(`/report/`);
    return response.data;
  },
};
