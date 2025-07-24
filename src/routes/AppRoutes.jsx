import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../middlewares/ProtectedRoute";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import User from "@/pages/User";
import Sales from "@/pages/transactions/Sales";
import AddSales from "@/pages/transactions/AddSales";
import Expenses from "@/pages/transactions/Expenses";
import AddExpenses from "@/pages/transactions/AddExpenses";
import Report from "@/pages/Report";
import ProfitShare from "@/pages/ProfitShare";

const protectedRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user",
    element: <User />,
    allowedRoles: ["admin"],
  },
  {
    path: "/penjualan",
    element: <Sales />,
    allowedRoles: ["admin", "operator", "owner"],
  },
  {
    path: "/penjualan/tambah",
    element: <AddSales />,
    allowedRoles: ["admin", "operator"],
  },
  {
    path: "/biaya",
    element: <Expenses />,
    allowedRoles: ["admin", "operator", "owner"],
  },
  {
    path: "/biaya/form",
    element: <AddExpenses />,
    allowedRoles: ["admin", "operator"],
  },
  {
    path: "/bagi-hasil",
    element: <ProfitShare />,
    allowedRoles: ["admin", "operator"],
  },
  {
    path: "/laporan",
    element: <Report />,
    allowedRoles: ["admin", "operator", "owner"],
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {protectedRoutes.map(({ path, element, allowedRoles }, index) => (
        <Route key={index} path={path} element={<ProtectedRoute allowedRoles={allowedRoles}>{element}</ProtectedRoute>} />
      ))}

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
