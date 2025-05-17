import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-logo">
          <Link to="/" className="footer-logo-link">
            <span className="logo-icon">🌱</span>
            FoodWaste Solutions
          </Link>
          <p className="footer-description">
            Reducing food waste through sustainable practices and community engagement.
          </p>
        </div>
        
        <div className="footer-links">
          <div className="footer-link-group">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-link-group">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Sustainability Tips</a></li>
            </ul>
          </div>
          
          <div className="footer-link-group">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FoodWaste Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;