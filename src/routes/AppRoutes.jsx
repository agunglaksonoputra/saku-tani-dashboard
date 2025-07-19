import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../middlewares/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import User from "@/pages/User";
import Sales from "@/pages/transactions/Sales";
import AddSales from "@/pages/transactions/AddSales";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path="/penjualan"
        element={
          <ProtectedRoute allowedRoles={["admin", "operator", "owner"]}>
            <Sales />
          </ProtectedRoute>
        }
      />

      <Route
        path="/penjualan/tambah"
        element={
          <ProtectedRoute allowedRoles={["admin", "operator"]}>
            <AddSales />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
