import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  const token = Cookies.get("token");

  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

export const getUserById = async (id) => {
  const token = Cookies.get("token");

  const response = await axios.get(`${API_URL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

export const createUser = async (data) => {
  const token = Cookies.get("token");

  try {
    const response = await axios.post(`${API_URL}/auth/register`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    console.error("Error create user:", err);
    throw err;
  }
};

export const updateUser = async (id, data) => {
  const token = Cookies.get("token");

  const response = await axios.put(`${API_URL}/user/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data;
};

export const deleteUser = async (id) => {
  try {
    if (!id) {
      throw new Error("User ID is required");
    }

    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.delete(`${API_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
