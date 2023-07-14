import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ loginUser }) => {
  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">ByteByteBox</Link>
        </div>
        {loginUser ? (
          <div className="menu">
          <div className="welcome">Welcome {loginUser?.username}</div>
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
