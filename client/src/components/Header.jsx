import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="container">
        <div className="logo">
          <Link to="/"><img src="/img/logo.png" alt="Logo" /></Link>
        </div>
  
        <ul className={`navbar ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/demo" onClick={() => setIsMobileMenuOpen(false)}>Demo</Link></li>
          <li><Link to="/api-key-gen" onClick={() => setIsMobileMenuOpen(false)}>API</Link></li>
          <li>
            <a
              href="https://captcha-3.gitbook.io/captcha-docs/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dokumentace
            </a>
          </li>
        </ul>
  
        <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen 
            ? <i className="bx bx-x"></i>
            : <i className="bx bx-menu"></i>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
