import React from "react";
import { NavLink } from "react-router-dom";
import Logo from '../Logo';
import "./footer.css"; 
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <div>
        <Logo/>
        <a href="mailto:gulshanku9135@gmail.com">
          <MdEmail />
          <p>support@lmsskills.com</p>
        </a>
        <a href="tel:+1234567890">
          <MdPhone />
          <p>+91 (234) 567-890</p>
        </a>
        <div className="social-icons">
          <a href="">
            <MdFacebook />
          </a>
          <a href="https://instagram/gulshan_300">
            <FaInstagram />
          </a>
          <a href="">
            <FaTelegram />
          </a>
          <a href="">
            <FaYoutube />
          </a>
          <a href="">
            <FaTwitter />
          </a>
          <a href="">
            <FaLinkedin />
          </a>
          <a href="">
            <FaDiscord />
          </a>
        </div>
      </div>
      
      <div className="right-container">
        <div className="company-details">
            <h2>Company</h2>
            <ul>
                <li><NavLink to="/about-us">About Us</NavLink></li>
                <li><NavLink to="/contact-us">Contact Us</NavLink></li>
                <li><NavLink to="/faqs">FAQ</NavLink></li>
                <li><NavLink to="/terms-conditions">Terms and Conditions</NavLink></li>
            </ul>
        </div>
        <div className="products">
            <h2>Products</h2>
            <ul>
                <li><NavLink to="/courses">Courses</NavLink></li>
                <li>Quiz</li>
                <li>Learning Resocurce</li>
                <li>Roadmap</li>
            </ul>
        </div>
      </div>
    </footer>
  );
}
