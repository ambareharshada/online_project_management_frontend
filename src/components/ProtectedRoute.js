// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// This component checks if the user is authenticated
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render the children components (e.g., Dashboard)
  return children;
};

export default ProtectedRoute;
