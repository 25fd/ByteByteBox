import React from 'react';
import LoginForm from '../components/LoginForm';
import Header from '../components/header';
import '../styles/LoginPage.css';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) {
    navigate('/home');
  }
  return (
    <>
    <Header/>
    <div>
      <h1>User Login</h1>
      <LoginForm />
    </div>
    </>
  );
};

export default LoginPage;
