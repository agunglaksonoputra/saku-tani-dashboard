import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async (page = currentPage) => {
    setLoading(true);
    try {
      const data = await getUsers(page);
      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || page);
      setTotalItems(data.totalItems || 0);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchUsers(page);
    }
  };

  return {
    users,
    totalPages,
    currentPage,
    totalItems,
    loading,
    error,
    goToPage,
    refetch: () => fetchUsers(currentPage),
  };
};
