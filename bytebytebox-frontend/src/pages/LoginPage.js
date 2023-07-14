import React from 'react';
import LoginForm from '../components/LoginForm';
import Header from '../components/header';
import '../styles/LoginPage.css';

const LoginPage = () => {
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
