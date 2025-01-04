import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from './Components/Container/Admin/Pages/global/LoginContext';
import { LoadingPage } from './PageLoading';
export const ProtectedRoute = () => {
      const { auth, loading } = useContext(AuthContext);
    
      if (loading) {
        return <LoadingPage/>
      }
    
      return auth && auth.token ? <Outlet /> : <Navigate to="/" replace />;
    };