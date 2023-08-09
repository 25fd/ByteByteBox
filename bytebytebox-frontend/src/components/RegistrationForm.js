import React, { useState } from 'react';
import Toast from '../components/Tost';
import { useAuth } from '../contexts/AuthContext';


const RegistrationForm = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [type, setType] = React.useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, email, password);
      if (response.error) {
        setMessage(response.error);
        setType('error');
      } else {
        setMessage(response.message);
      setType('success');
      }
    } catch (error) {
      console.log(error);
    }
    setShowToast(true);
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
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
      <button type="submit">Register</button>
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

export default RegistrationForm;
