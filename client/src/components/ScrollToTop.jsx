import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';
import { FaArrowUp } from 'react-icons/fa'; 

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.1);
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`scroll-to-top ${isVisible ? 'show' : ''}`} 
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </div>
  );
};

export default ScrollToTop;