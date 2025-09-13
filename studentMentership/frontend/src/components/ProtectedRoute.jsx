import React from "react";
import { Navigate } from "react-router-dom";
import { authAPI } from "../api/client.js";

const ProtectedRoute = ({ children, requiredRole = null, allowedRoles = null }) => {
  const isAuthenticated = authAPI.isAuthenticated();
  const userRole = authAPI.getRole();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If specific role is required
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={`/${getDefaultRouteForRole(userRole)}`} replace />;
  }

  // If multiple roles are allowed
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={`/${getDefaultRouteForRole(userRole)}`} replace />;
  }

  return children;
};

// Helper function to get default route for each role
const getDefaultRouteForRole = (role) => {
  switch (role) {
    case "mentee":
      return "mentee";
    case "mentor":
      return "mentor";
    case "student_union":
      return "student-union";
    case "admin":
      return "admin";
    default:
      return "mentee";
  }
};

export default ProtectedRoute;
