import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo gradient-text">SB.</div>
        
        <div className="footer-socials">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={20} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
          <a href="mailto:sauravbhojak6156@gmail.com" aria-label="Email"><FaEnvelope size={20} /></a>
        </div>
        
        <p className="copyright">
          &copy; {new Date().getFullYear()} Saurav Bhojak. Built with React & Vanilla CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
