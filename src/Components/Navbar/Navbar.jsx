// Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faChartLine } from '@fortawesome/free-solid-svg-icons';
import logo from '/logo.webp';  // Ensure the path is correct based on your project structure

const Navbar = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') {
      setSelected('home');
    } else if (path === '/search') {
      setSelected('search');
    } else if (path === '/portfolio') {
      setSelected('portfolio');
    }
  }, []);

  const handleClick = (option) => {
    setSelected(option);
  };

  return (
    <nav className="navbar fixed-top">
      <div className="navbar-left">
        <Link to='/' onClick={() => handleClick('home')} className={selected === 'home' ? 'selected' : ''}>
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-right">
        <div className="nav-item">
          <Link to='/' onClick={() => handleClick('home')} className={selected === 'home' ? 'selected' : ''}>
            <div className="box">
              <FontAwesomeIcon icon={faHome} className="nav-icon" />
            </div>
            <span>Home</span>
          </Link>
        </div>
        <div className="nav-item">
          <Link to='/search' onClick={() => handleClick('search')} className={selected === 'search' ? 'selected' : ''}>
            <div className="box">
              <FontAwesomeIcon icon={faSearch} className="nav-icon" />
            </div>
            <span>Search</span>
          </Link>
        </div>
        <div className="nav-item">
          <Link to='/portfolio' onClick={() => handleClick('portfolio')} className={selected === 'portfolio' ? 'selected' : ''}>
            <div className="box">
              <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
            </div>
            <span>Portfolio</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
