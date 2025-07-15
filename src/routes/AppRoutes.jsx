import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../middlewares/ProtectedRoute";
import Home from "../pages/Home";
// import About from "../pages/About";
// import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import User from "@/pages/User";

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
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />

      {/* <Route path="/about" element={<About />} /> */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
