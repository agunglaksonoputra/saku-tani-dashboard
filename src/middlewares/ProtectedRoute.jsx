import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    // Kalau belum login, redirect ke login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
