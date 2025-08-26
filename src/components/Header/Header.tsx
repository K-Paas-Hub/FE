import React from 'react';
import '../../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <span>Fair </span>
        <span>Work</span>
      </div>
      <nav className="header-nav">
        <a href="#about">ABOUT US</a>
        <a href="#features">FEATURES</a>
        <a href="#partners">PARTNERS</a>
      </nav>
    </header>
  );
};

export default Header;
