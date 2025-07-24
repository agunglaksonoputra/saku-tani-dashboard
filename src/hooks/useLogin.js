import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError("");

    try {
      const result = await login(username, password);

      // Cek apakah login berhasil berdasarkan isi respons (tergantung API-mu)
      if (result?.token || result?.success) {
        navigate("/");
      } else {
        setError("Login gagal. Periksa username/password.");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Terjadi kesalahan saat login.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
    error,
  };
};
