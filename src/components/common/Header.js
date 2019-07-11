import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div id="navbar">
      <Link to="/" id="logo">
        <i className="fas fa-coins"></i>Banka
      </Link>
      <div id="navbar-right">
        <Link to="/login" className="login-btn">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
