import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/HomePage";
import Signup from "../pages/Signup";
import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const { isLoaded, isSignedIn, getToken } = useAuth(); // Get auth token

  if (!isLoaded) {
    return <div>Loading...</div>; // Prevent unnecessary redirects
  }

  const checkAuth = async () => {
    const token = await getToken(); // Retrieve token manually
    return token !== null; // Return true if token exists
  };

  if (isSignedIn && checkAuth()) {
    return element; // Allow access if user is authenticated
  }

  return <RedirectToSignIn redirectUrl={location.pathname} />;
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
