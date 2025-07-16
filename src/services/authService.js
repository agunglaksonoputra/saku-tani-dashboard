import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (username, password) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );

  const { token, user } = response.data;

  if (token) {
    // Simpan token & user ke cookie dengan masa berlaku 1 jam (opsional)
    Cookies.set("token", token, { expires: 0.0208 }); // 30 menit
    Cookies.set("user", JSON.stringify(user), { expires: 0.0208 }); // 30 menit
  }

  return response.data;
};

export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("user");
};

export const getToken = () => Cookies.get("token");

export const getUser = () => {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
};
