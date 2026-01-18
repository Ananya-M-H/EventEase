import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // Show loader while auth state is being fetched
  if (loading) return <Loader />;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role-based access (e.g., ADMIN)
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
};

export default ProtectedRoute;
