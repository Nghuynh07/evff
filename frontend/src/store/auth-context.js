import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  isAuthenticated: () => {},
  loading: false,
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedInUser = localStorage.getItem('jwt');
      if (loggedInUser) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const logout = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:4000/api/v1/users/logout');
      setTimeout(() => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setIsLoading(false);
      }, 1500);
      return res;
    } catch (err) {
      setIsLoading(true);
    }
  };

  const login = (data, next) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(data));
      setIsLoggedIn(true);
      next();
    }
  };

  const isAuthenticated = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    if (localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'));
    } else {
      return false;
    }
  };

  const values = {
    isLoggedIn,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
