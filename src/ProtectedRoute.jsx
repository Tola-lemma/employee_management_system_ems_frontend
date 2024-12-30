import React from 'react'
import { Outlet } from 'react-router-dom'
import { LoginPage } from './Components/Container/Admin/LoginPage/LoginPage'
const useAuth = ()=>{
      const token = localStorage.getItem('token')
      const loggedIn = token;
      return loggedIn;
}
export const ProtectedRoute = () => {
      const isAuth = useAuth()
  return ( isAuth? <Outlet/> : <LoginPage />
  )
}
