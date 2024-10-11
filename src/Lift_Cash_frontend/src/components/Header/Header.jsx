import { useState } from "react";
import { GoMoon, GoSun } from "react-icons/go";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <header className="header-main">
      {/* Left Side: Logo */}
      <div className="header-logo">
        <img src="/logo.png" alt="Logo" className="header-logo-img" />
      </div>

      {/* Center: Navigation Links (Hidden on Mobile) */}
      <nav className="header-navigation-link-nav">
        <a href="#home" className="header-navigation-link">
          Home
        </a>
        <a href="#about" className="header-navigation-link">
          About
        </a>
        <a href="#dao" className="header-navigation-link">
          DAO
        </a>
        <a href="#purpose" className="header-navigation-link">
          Purpose
        </a>
        <a href="#faq" className="header-navigation-link">
          FAQ
        </a>
        <a href="#blog" className="header-navigation-link">
          Blog
        </a>
        <a href="#documents" className="header-navigation-link">
          Documents
        </a>
      </nav>

      {/* Right Side: Theme Toggle and Button */}
      <div className="header-right-side-buttons">
        {/* Moon Icon (For Dark Mode Toggle) */}
        <button onClick={toggleTheme} className="header-theme-icon">
          {isDarkTheme ? <GoSun /> : <GoMoon />}
        </button>

        {/* "Open App" Button */}
        <button
          className="header-signUp-btn"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Open App
        </button>

        {/* Hamburger Menu Icon (Mobile/Tablet) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="header-hamburger-icon">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Visible when the menu is toggled) */}
      {isMenuOpen && (
        <nav className="header-mobile-naviagtion-link">
          <a
            href="#home"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            Home
          </a>
          <a
            href="#about"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            About
          </a>
          <a
            href="#dao"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            DAO
          </a>
          <a
            href="#purpose"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            Purpose
          </a>
          <a
            href="#faq"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            FAQ
          </a>
          <a
            href="#blog"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            Blog
          </a>
          <a
            href="#documents"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            Documents
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
