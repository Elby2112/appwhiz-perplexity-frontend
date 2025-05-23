import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="icon">
          <i className="fas fa-book-open"></i>
        </div>
      </div>
      <div className="header-right">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
