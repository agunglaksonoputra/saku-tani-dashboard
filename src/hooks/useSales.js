// hooks/useSales.js
import { useState, useEffect, useCallback } from "react";
import { salesService } from "../services/salesService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalFilter: 0,
    totalPrice: 0,
    totalWeightKg: 0,
  });

  const [filters, setFilters] = useState({
    customer: "",
    item_name: "",
    startDate: "",
    endDate: "",
    sort_by: "",
    sort_order: "",
  });

  const [selectedSale, setSelectedSale] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const navigate = useNavigate();

  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };

      const response = await salesService.getSales(params);

      setSales(response.data);
      setPagination((prev) => ({
        ...prev,
        total: response.total,
        totalFilter: response.totalFilter,
        totalPrice: response.totalPrice,
        totalWeightKg: response.totalWeightKg,
        avgPricePerTransaction: response.avgPricePerTransaction,
      }));
    } catch (err) {
      setError(err.message || "Failed to fetch sales data");
      console.error("Error fetching sales:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

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

  const handleSort = (sortBy) => {
    const newOrder = filters.sort_by === sortBy && filters.sort_order === "asc" ? "desc" : "asc";
    setFilters((prev) => ({
      ...prev,
      sort_by: sortBy,
      sort_order: newOrder,
    }));
  };

  const clearFilters = () => {
    setFilters({
      customer: "",
      item_name: "",
      startDate: "",
      endDate: "",
      sort_by: "",
      sort_order: "",
    });
  };

  const refreshData = () => {
    fetchSales();
  };

  const handleAdd = () => {
    navigate("/penjualan/tambah");
  };

  const handleView = (id) => {
    const found = sales.find((s) => s.id === id);
    setSelectedSale(found);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await salesService.deleteSale(deleteId);
      refreshData();
      toast.success("Data berhasil dihapus");
    } catch (err) {
      console.error("Error deleting sale:", err);
      toast.error("Gagal menghapus data");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleImport = async (file) => {
    setImporting(true);

    try {
      await salesService.importSales(file);
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
    sales,
    loading,
    error,
    pagination,
    filters,
    importing,
    selectedSale,
    dialogOpen,
    deleteId,
    isDeleteDialogOpen,
    setDialogOpen,
    setIsDeleteDialogOpen,
    handlePageChange,
    handleLimitChange,
    handleFilterChange,
    handleSort,
    clearFilters,
    refreshData,
    handleAdd,
    handleView,
    handleDelete,
    confirmDelete,
    handleImport,
  };
};

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await salesService.getCustomers();
      setCustomers(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch customers");
      console.error("Error fetching customers:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, loading, error };
};
