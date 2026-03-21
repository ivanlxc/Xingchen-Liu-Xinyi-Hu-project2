import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand" onClick={closeMenu}>
        <svg className="nav-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="9" y1="3" x2="9" y2="21"/>
          <line x1="15" y1="3" x2="15" y2="21"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
        </svg>
        <span>Sudoku Master</span>
      </Link>
      <button className={`nav-toggle-label ${menuOpen ? 'nav-open' : ''}`} onClick={toggleMenu}>
        <span className="hamburger-line"></span>
      </button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className={isActive('/')} onClick={closeMenu}>Home</Link>
        <Link to="/games" className={isActive('/games')} onClick={closeMenu}>Games</Link>
        <Link to="/games/normal" className={isActive('/games/normal')} onClick={closeMenu}>Normal</Link>
        <Link to="/games/easy" className={isActive('/games/easy')} onClick={closeMenu}>Easy</Link>
        <Link to="/rules" className={isActive('/rules')} onClick={closeMenu}>Rules</Link>
        <Link to="/scores" className={isActive('/scores')} onClick={closeMenu}>Scores</Link>
        <Link to="/login" className={isActive('/login')} onClick={closeMenu}>Login</Link>
        <Link to="/register" className={isActive('/register')} onClick={closeMenu}>Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
