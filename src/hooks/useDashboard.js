import { useState, useEffect, useCallback } from "react";
import { reportService } from "@/services/reportService";

export const useDashboard = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await reportService.getReportCurent();

      if (response.success) {
        setReport(response.data);
      } else {
        setError("Gagal memuat data");
      }
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const refreshData = () => {
    fetchReport();
  };

  return {
    report,
    loading,
    error,
    refreshData,
  };
};
