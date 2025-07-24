import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { getToken } from "../services/authService";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const token = getToken();
  const user = JSON.parse(Cookies.get("user") || "{}");
  const role = typeof user?.role === "string" ? user.role : user?.role?.name;

  // 🔐 Belum login
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 🚫 Role tidak diizinkan
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
