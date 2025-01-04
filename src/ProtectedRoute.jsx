import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from './Components/Container/Admin/Pages/global/LoginContext';
export const ProtectedRoute = () => {
      const { auth } = useContext(AuthContext);
      return auth && auth.token ? <Outlet /> : <Navigate to="/" replace/>;
};