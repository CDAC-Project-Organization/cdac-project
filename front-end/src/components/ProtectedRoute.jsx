import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  // Check if user is authenticated using the same keys as Login component
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  
  if (!isAuthenticated || !currentUser.id) {
    // No authentication found, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required, check user role
  if (requiredRole) {
    // Check if user has the required role
    if (requiredRole === 'admin' && currentUser.role !== 'admin') {
      return <Navigate to="/login" replace />;
    }
    if (requiredRole === 'doctor' && currentUser.role !== 'doctor') {
      return <Navigate to="/login" replace />;
    }
    if (requiredRole === 'patient' && currentUser.role !== 'patient') {
      return <Navigate to="/login" replace />;
    }
  }

  // User is authenticated and has correct role
  return children;
};

export default ProtectedRoute;
