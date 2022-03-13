import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  isAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedInUser = localStorage.getItem('jwt');
      if (loggedInUser) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const logout = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/users/logout');
      localStorage.removeItem('jwt');
      setIsLoggedIn(false);
      // return res;
    } catch (err) {
      console.log(err);
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
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
