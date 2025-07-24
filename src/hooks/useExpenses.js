import { useState, useEffect, useCallback } from "react";
import { expensesService } from "@/services/expensesService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalFilter: 0,
    totalPrice: 0,
    avgPricePerTransaction: 0,
  });
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    sort_order: "",
  });

  const [selectedExpenses, setSelectedExpenses] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const navigate = useNavigate();

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };

      const response = await expensesService.getExpenses(params);

      setExpenses(response.data);
      setPagination((prev) => ({
        ...prev,
        total: response.total,
        totalFilter: response.totalFilter,
        totalPrice: response.totalPrice,
        avgPricePerTransaction: response.avgPricePerTransaction,
      }));
    } catch (err) {
      setError(err.message || "Failed to fetch expenses data");
      console.error("Error fetching expenses:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      sort_order: "",
    });
  };

  const refreshData = () => {
    fetchExpenses();
  };

  const handleAdd = () => {
    navigate("/biaya/form");
  };

  const handleView = (id) => {
    const found = expenses.find((s) => s.id === id);
    setSelectedExpenses(found);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await expensesService.deleteExpenses(deleteId);
      refreshData();
      toast.success("Data berhasil dihapus");
    } catch (err) {
      console.error("Error deleting expenses:", err);
      toast.error("Gagal menghapus data");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleImport = async (file) => {
    setImporting(true);

    try {
      await expensesService.importExpenses(file);
      refreshData();
      toast.success("Import data berhasil");
    } catch (err) {
      const apiMessage = err.response?.data?.message || err.message || "Gagal mengimpor data";
      toast.error(apiMessage);
    } finally {
      setImporting(false);
    }
  };

  return {
    expenses,
    loading,
    error,
    pagination,
    filters,
    importing,
    selectedExpenses,
    dialogOpen,
    deleteId,
    isDeleteDialogOpen,
    setDialogOpen,
    setIsDeleteDialogOpen,
    handlePageChange,
    handleLimitChange,
    handleFilterChange,
    clearFilters,
    refreshData,
    handleAdd,
    handleView,
    handleDelete,
    confirmDelete,
    handleImport,
  };
};
