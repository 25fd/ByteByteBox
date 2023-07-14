import React from 'react';
import '../styles/Tost.css';

const Toast = ({ message, type, onClose }) => {
    message = message || 'Success!';
  const toastClassName = `toast ${type}`;

  return (
    <div className={toastClassName}>
      <div className="message">{message}</div>
      <button className="close" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Toast;
