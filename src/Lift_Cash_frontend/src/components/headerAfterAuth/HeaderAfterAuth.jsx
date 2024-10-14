import "./HeaderAfterAuth.css"; // Import the CSS file
import "./Header.css"; // Import the CSS file
import { useState } from "react";
import {
  FaTimes,
  FaDollarSign,
  FaArrowRight,
  FaInfoCircle,
  FaBars,
} from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import AnimationBtn from "../animationBtn/AnimationBtn";

const HeaderAfterAuth = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header">
      {/* Left Side - Hamburger Icon */}
      <div className="hamburger-icon">
        <FaBars size={24} onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Right Side - Web version, username, and logout */}
      <div className="right-content">
        <span>v0.6.6</span>
        <span>shadabquad</span>
        <button className="logout-button">Logout</button>
      </div>

      <div
        className={`sidebar-container ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="sidebar-close-btn">
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <FiActivity size={24} className="sidebar-icon" />
            <span>Activities</span>
          </li>
          <li className="sidebar-menu-item">
            <FaDollarSign size={24} className="sidebar-icon" />
            <span>Claim / Assets</span>
          </li>
          <li className="sidebar-menu-item">
            <FaArrowRight size={24} className="sidebar-icon" />
            <span>Transfer</span>
          </li>
          <li className="sidebar-menu-item">
            <FaInfoCircle size={24} className="sidebar-icon" />
            <span>Info</span>
          </li>
        </ul>

        {/* Enable Animation Toggle */}
        <div className="toggle-animation-container">
          <AnimationBtn />
        </div>
      </div>
    </div>
  );
};

export default HeaderAfterAuth;
