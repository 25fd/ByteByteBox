import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


const Header = () => {
  const { user: loginUser, logout } = useAuth(); // Get the authenticated user from the AuthContext
  console.log(loginUser);
  const handleLogout = () => {
    logout();
    window.location.reload();
  }
  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/home">ByteByteBox</Link>
        </div>
        {loginUser ? (
          <div className="menu">
          <div className="welcome">Welcome <strong>{loginUser?.user?.username}</strong></div>
          <div className="menu">
          <Link to="/upload">Upload</Link>
          <Link to="/myfiles">myfiles</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
        </div>
        ) :(<div className="menu">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>)
}
      </nav>
    </header>
  );
};

export default Header;
