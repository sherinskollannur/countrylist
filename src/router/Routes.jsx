import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/HomePage";
import Signup from "../pages/Signup";
import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ element }) => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? element : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
    <Route path="*" element={<Login />} />
  </Routes>
);

export default AppRoutes;
