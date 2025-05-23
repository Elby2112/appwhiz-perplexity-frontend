import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-text">© 2025 Loubna Bouzenzen</span>
        <div className="social-icons">
          <a href="https://github.com/Elby2112" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/loubna-bouzenzen-86a6441b8/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="mailto:loubnabouzenzen820@gmail.com"><FaEnvelope /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
