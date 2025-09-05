import React from "react";
import { Navigate } from "react-router-dom";
import { authAPI } from "../api/client.js";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isAuthenticated = authAPI.isAuthenticated();
  const userRole = authAPI.getRole();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate page based on role
    switch (userRole) {
      case "mentee":
        return <Navigate to="/mentee" replace />;
      case "mentor":
        return <Navigate to="/mentor" replace />;
      case "student_union":
        return <Navigate to="/studentunion" replace />;
      case "admin":
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/mentee" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
