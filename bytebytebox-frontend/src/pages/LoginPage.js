import React from 'react';
import LoginForm from '../components/LoginForm';
import Header from '../components/header';
import '../styles/LoginPage.css';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { user } = useAuth();
  // if (user) {
  //   window.location.href = '/home';
  // }
  return (
    <>
    <Header loginUser={null}/>
    <div>
      <h1>User Login</h1>
      <LoginForm />
    </div>
    </>
  );
};

export default LoginPage;
