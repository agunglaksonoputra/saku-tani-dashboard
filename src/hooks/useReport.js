import { useState, useEffect, useCallback } from "react";
import { reportService } from "@/services/reportService";
import { toast } from "sonner";

export const useReport = () => {
  const [report, setReport] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await reportService.getReport();

      if (response.success) {
        setReport(response.data);
      } else {
        toast.error("Gagal memuat laporan.");
        setError("Gagal memuat data");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat mengambil data laporan.");
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

  const handleExport = async () => {
    setExporting(true);

    const getFormattedDate = () => {
      const today = new Date();
      return today.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });
    };

    try {
      const response = await reportService.exportReport();
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Laporan Bisnis Sayur ${getFormattedDate()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Export berhasil");
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Gagal mengexport data";
      toast.error(message);
    } finally {
      setExporting(false);
    }
  };

  return {
    report,
    loading,
    error,
    exporting,
    refreshData,
    handleExport,
  };
};
