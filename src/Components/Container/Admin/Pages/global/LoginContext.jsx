import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  const activityTimeout = useRef(null);
  const [loading, setLoading] = useState(true); 
  const login = (token) => {
    Cookies.set('token', token, { expires: 1 , 
      secure: false, // Allow cookies on HTTP for development
      sameSite: 'Lax', // Relax restrictions for cross-origin requests in local dev
    });
    setAuth({ token });
  };

  const logout = useCallback(() => {
    Cookies.remove('token');
    setAuth(null);
    navigate('/');
  }, [navigate]);

  const logoutDueToInactivity =useCallback(() => {
    alert('For security reasons, your session was terminated due to inactivity.');
    logout();
  },[logout]);

  useEffect(() => {
    const token =  Cookies.get('token');
    if (token) {
      setAuth({ token });
    }
    setLoading(false);
    // Set up activity listeners
    const resetTimer = () => {
      clearTimeout(activityTimeout.current);
      activityTimeout.current = setTimeout(logoutDueToInactivity, 60 * 60 * 1000); // 1hr minutes
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('click', resetTimer);

    // Initial setup
    resetTimer();

    // Cleanup activity listeners
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('click', resetTimer);
      clearTimeout(activityTimeout.current);
    };
  }, [logoutDueToInactivity]);

  const checkTokenExpiry = useCallback(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        alert('For security reasons, your session was terminated.');
        logout();
      }
    }
  }, [logout]);

  useEffect(() => {
    const interval = setInterval(checkTokenExpiry, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [checkTokenExpiry]);

  return (
    <AuthContext.Provider value={{ auth,loading , login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;