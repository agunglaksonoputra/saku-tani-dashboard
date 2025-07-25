import { useEffect, useState } from "react";
import { getUserById, updateUser, deleteUser, createUser as createUserService } from "../services/userService";

export const useUser = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const update = async (newData) => {
    setUpdating(true);
    setError(null);
    try {
      const updatedUser = await updateUser(id, newData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  const remove = async (id) => {
    setDeleting(true);
    setError(null);
    try {
      await deleteUser(id);
      setUser(null);
      return true;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setDeleting(false);
    }
  };

  const create = async (newData) => {
    setCreating(true);
    setError(null);
    try {
      const createdUser = await createUserService(newData);
      return createdUser;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setCreating(false);
    }
  };

  const refetch = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getUserById(id);
      setUser(data);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    updating,
    deleting,
    creating,
    error,
    update,
    remove,
    create,
    refetch,
    setDeleting,
  };
};
