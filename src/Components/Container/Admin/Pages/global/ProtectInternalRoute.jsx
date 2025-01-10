import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const ProtectedInternalRoute = ({ children, allowedRoles }) => {
  const token = Cookies.get('token');

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login if no token
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (allowedRoles.includes(userRole)) {
      return children;
    } else {
      return <Navigate to="/home/unauthorized" replace />; // Redirect if role is unauthorized
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/" replace />; // Redirect if token is invalid
  }
};

export default ProtectedInternalRoute;
