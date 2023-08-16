
import React, { useState } from 'react';
import Toast from '../components/Tost';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [type, setType] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.error) {
        console.log(response.error);
        setMessage(response.error);
        setType('error');
      } else {
        setMessage(response.message);
        setType('success');
        navigate('/home');
      }
    } catch (error) {
       console.log(error);
    }
    setShowToast(true);
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Login</button>
      {showToast && (
        <Toast
          message={message}
          type={type}
          onClose={() => setShowToast(false)}
        />
      )}
    </form>
  );
};

export default LoginForm;
