import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>&copy; CAPTCHA {new Date().getFullYear()} | Code a design by <a href="https://jakubcotobias05.github.io/Portfolio/" target="_blank" rel="noopener noreferrer">Tobias Jakubčo</a></p>
    </footer>
  );
};

export default Footer;