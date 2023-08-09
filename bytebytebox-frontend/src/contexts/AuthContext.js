// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to handle user login
  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  // Function to handle user registration
  const register = async (name, email, password) => {
    try {
      const response = await api.register(name, email, password);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Function to check if a user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  useEffect(() => {
    // Check if the user is already authenticated from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
