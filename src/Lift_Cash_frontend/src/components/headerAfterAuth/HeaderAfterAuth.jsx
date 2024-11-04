import "./HeaderAfterAuth.css"; // Import the CSS file
import { useState } from "react";
import {
  FaTimes,
  FaDollarSign,
  FaArrowRight,
  FaInfoCircle,
  FaBars,
} from "react-icons/fa";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { SlArrowRightCircle } from "react-icons/sl";
import { GoArrowSwitch } from "react-icons/go";
import { FiActivity } from "react-icons/fi";
import AnimationBtn from "../animationBtn/AnimationBtn";
import { Link } from "react-router-dom";
import { useAuthClient } from "../../utils/useAuthClient";
import { useNavigate } from "react-router-dom";


const HeaderAfterAuth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthClient();
  const navigate = useNavigate();


  const Logout =()=>{
    logout();
    navigate("/")
  }

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
        <button className="logout-button" onClick={Logout}>Logout</button>
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
          <Link to="/activities">
            <li className="sidebar-menu-item">
              <FiActivity style={{marginRight:"5px",marginLeft:"5px"}} size={24} className="sidebar-icon" />
              <span>Activities</span>
            </li>
          </Link>
          <Link to="/claim">
            <li className="sidebar-menu-item">
              <HiOutlineCurrencyDollar size={36} className="sidebar-icon" />
              <span>Claim / Assets</span>
            </li>
          </Link>
          <Link to="/transfer">
            <li className="sidebar-menu-item">
              <GoArrowSwitch style={{marginRight:"5px"}} size={32} className="sidebar-icon" />
              <span>Transfer</span>
            </li>
          </Link>
          <Link to="/mint">
            <li className="sidebar-menu-item">
              <SlArrowRightCircle style={{marginRight:"5px"}} size={32} className="sidebar-icon" />
              <span>Mint</span>
            </li>
          </Link>
          <Link to="/info">
            <li className="sidebar-menu-item">
              <IoIosInformationCircleOutline size={38} className="sidebar-icon" />
              <span>Info</span>
            </li>
          </Link>
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
