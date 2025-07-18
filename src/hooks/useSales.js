// hooks/useSales.js
import { useState, useEffect, useCallback } from "react";
import { salesService } from "../services/salesService";

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPrice: 0,
    totalWeightKg: 0,
  });

  const [filters, setFilters] = useState({
    customer: "",
    item_name: "",
    startDate: "",
    endDate: "",
    sort_by: "date",
    sort_order: "desc",
  });

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
      sort_by: "date",
      sort_order: "desc",
    });
  };

  const refreshData = () => {
    fetchSales();
  };

  return {
    sales,
    loading,
    error,
    pagination,
    filters,
    handlePageChange,
    handleLimitChange,
    handleFilterChange,
    handleSort,
    clearFilters,
    refreshData,
  };
};

// hooks/useCustomers.js
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

// hooks/useItems.js
export const useItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await salesService.getItems();
      setItems(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch items");
      console.error("Error fetching items:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error };
};
