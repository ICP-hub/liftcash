import { useState } from "react";
import { GoMoon, GoSun } from "react-icons/go";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    <header className="bg-blue-500 p-4 flex items-center justify-between">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
      </div>

      {/* Center: Navigation Links (Hidden on Mobile) */}
      <nav className="hidden md:flex space-x-6 text-white">
        <a href="#home" className="hover:text-gray-300">
          Home
        </a>
        <a href="#about" className="hover:text-gray-300">
          About
        </a>
        <a href="#dao" className="hover:text-gray-300">
          DAO
        </a>
        <a href="#purpose" className="hover:text-gray-300">
          Purpose
        </a>
        <a href="#faq" className="hover:text-gray-300">
          FAQ
        </a>
        <a href="#blog" className="hover:text-gray-300">
          Blog
        </a>
        <a href="#documents" className="hover:text-gray-300">
          Documents
        </a>
      </nav>

      {/* Right Side: Theme Toggle and Button */}
      <div className="flex items-center space-x-4">
        {/* Moon Icon (For Dark Mode Toggle) */}
        <button
          onClick={toggleTheme}
          className="hidden md:block text-white text-2xl "
        >
          {isDarkTheme ? <GoSun /> : <GoMoon />}
        </button>

        {/* "Open App" Button */}
        <button className="hidden md:block bg-white text-blue-500 font-bold py-2 px-4 rounded-md hover:bg-gray-100 "
          onClick={()=>{
            navigate('/signup');
          }}
        >
          Open App
        </button>

        {/* Hamburger Menu Icon (Mobile/Tablet) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-3xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Visible when the menu is toggled) */}
      {isMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-black text-white p-6 flex flex-col space-y-4 md:hidden">
          <a href="#home" className="hover:text-gray-300" onClick={toggleMenu}>
            Home
          </a>
          <a href="#about" className="hover:text-gray-300" onClick={toggleMenu}>
            About
          </a>
          <a href="#dao" className="hover:text-gray-300" onClick={toggleMenu}>
            DAO
          </a>
          <a
            href="#purpose"
            className="hover:text-gray-300"
            onClick={toggleMenu}
          >
            Purpose
          </a>
          <a href="#faq" className="hover:text-gray-300" onClick={toggleMenu}>
            FAQ
          </a>
          <a href="#blog" className="hover:text-gray-300" onClick={toggleMenu}>
            Blog
          </a>
          <a
            href="#documents"
            className="hover:text-gray-300"
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
