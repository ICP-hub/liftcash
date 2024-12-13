// import "./HeaderAfterAuth.css";
// import { useState } from "react";
// import { FaBars } from "react-icons/fa";
// import { HiOutlineCurrencyDollar } from "react-icons/hi2";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { IoMdClose } from "react-icons/io";
// import { MdOutlinePoll } from "react-icons/md";
// import { MdPoll } from "react-icons/md";
// import { RiLoginCircleFill } from "react-icons/ri";
// import { IoIosInformationCircle } from "react-icons/io";
// import { HiCurrencyDollar } from "react-icons/hi2";
// import { GoArrowSwitch } from "react-icons/go";
// import { RiLoginCircleLine } from "react-icons/ri";
// import AnimationBtn from "../animationBtn/AnimationBtn";
// import { Link } from "react-router-dom";
// import { useAuthClient } from "../../utils/useAuthClient";
// import { useNavigate } from "react-router-dom";

// const HeaderAfterAuth = ({ onToggleAnimation }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { logout } = useAuthClient();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("activity");

//   const Logout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <div className="header">
//       {/* Left Side - Hamburger Icon */}
//       <div className="hamburger-icon">
//         <FaBars size={24} onClick={() => setIsOpen(!isOpen)} />
//       </div>

//       {/* Right Side - Web version, username, and logout */}
//       <div className="right-content">
//         <span>v0.6.6</span>
//         <span>{localStorage.getItem("username")}</span>
//         <button className="logout-button" onClick={Logout}>
//           Logout
//         </button>
//       </div>

//       <div
//         className={`sidebar-container ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Close Button */}
//         <div className="sidebar-close-btn">
//           <button onClick={() => setIsOpen(false)}>
//             <IoMdClose size={30} color="black" />
//           </button>
//         </div>

//         {/* Menu Items */}

//         <ul className="sidebar-menu">
//           <Link onClick={() => setActiveTab("activity")} to="/activities">
//             <li
//               className={`sidebar-menu-item ${
//                 activeTab === "activity" ? "active" : ""
//               }`}
//             >
//               {activeTab === "activity" ? (
//                 <MdPoll size={36} className="sidebar-icon" />
//               ) : (
//                 <MdOutlinePoll size={36} className="sidebar-icon" />
//               )}
//               <span>Activities</span>
//             </li>
//           </Link>
//           <Link onClick={() => setActiveTab("claim")} to="/claim">
//             <li
//               className={`sidebar-menu-item ${
//                 activeTab === "claim" ? "active" : ""
//               }`}
//             >
//               {activeTab === "claim" ? (
//                 <HiCurrencyDollar size={36} className="sidebar-icon" />
//               ) : (
//                 <HiOutlineCurrencyDollar size={36} className="sidebar-icon" />
//               )}
//               <span>Claim / Assets</span>
//             </li>
//           </Link>
//           <Link onClick={() => setActiveTab("transfer")} to="/transfer">
//             <li
//               className={`sidebar-menu-item ${
//                 activeTab === "transfer" ? "active" : ""
//               }`}
//             >
//               <GoArrowSwitch
//                 style={{ marginRight: "5px" }}
//                 size={32}
//                 className="sidebar-icon"
//               />
//               <span>Transfer</span>
//             </li>
//           </Link>
//           <Link onClick={() => setActiveTab("mint")} to="/mint">
//             <li
//               className={`sidebar-menu-item ${
//                 activeTab === "mint" ? "active" : ""
//               }`}
//             >
//               {activeTab === "mint" ? (
//                 <RiLoginCircleFill size={40} className="sidebar-icon" />
//               ) : (
//                 <RiLoginCircleLine size={38} className="sidebar-icon" />
//               )}

//               <span>Mint</span>
//             </li>
//           </Link>
//           <Link onClick={() => setActiveTab("info")} to="/info">
//             <li
//               className={`sidebar-menu-item ${
//                 activeTab === "info" ? "active" : ""
//               }`}
//             >
//               {activeTab === "info" ? (
//                 <IoIosInformationCircle
//                   size={40}
//                   style={{ marginLeft: "-4px" }}
//                   className="sidebar-icon"
//                 />
//               ) : (
//                 <IoIosInformationCircleOutline
//                   size={40}
//                   style={{ marginLeft: "-4px" }}
//                   className="sidebar-icon"
//                 />
//               )}

//               <span>Info</span>
//             </li>
//           </Link>
//         </ul>

//         {/* Enable Animation Toggle */}
//         <div className="toggle-animation-container">
//           <AnimationBtn onToggleAnimation={onToggleAnimation} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeaderAfterAuth;

import "./HeaderAfterAuth.css";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { HiOutlineCurrencyDollar, HiCurrencyDollar } from "react-icons/hi2";
import {
  IoIosInformationCircleOutline,
  IoIosInformationCircle,
} from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdOutlinePoll, MdPoll } from "react-icons/md";
import { RiLoginCircleFill, RiLoginCircleLine } from "react-icons/ri";
import { GoArrowSwitch } from "react-icons/go";
import AnimationBtn from "../animationBtn/AnimationBtn";
import { Link, useLocation } from "react-router-dom";
import { useAuthClient } from "../../utils/useAuthClient";
import { useNavigate } from "react-router-dom";

const HeaderAfterAuth = ({ onToggleAnimation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthClient();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("activity");
  const location = useLocation();

  const Logout = () => {
    logout();
    navigate("/");
  };

  // Sync activeTab with the current URL path
  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveTab(path || "activity");
  }, [location]);

  return (
    <div className="header">
      {/* Left Side - Hamburger Icon */}
      <div className="hamburger-icon">
        <FaBars size={24} onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Right Side - Web version, username, and logout */}
      <div className="right-content">
        <span>v0.6.6</span>
        <span>{localStorage.getItem("username")}</span>
        <button className="logout-button" onClick={Logout}>
          Logout
        </button>
      </div>

      <div
        className={`sidebar-container ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="sidebar-close-btn">
          <button onClick={() => setIsOpen(false)}>
            <IoMdClose size={30} color="black" />
          </button>
        </div>

        {/* Menu Items */}
        <ul className="sidebar-menu">
          <Link onClick={() => setActiveTab("activity")} to="/activities">
            <li
              className={`sidebar-menu-item ${
                activeTab === "activity" ? "active" : ""
              }`}
            >
              {activeTab === "activity" ? (
                <MdPoll size={36} className="sidebar-icon" />
              ) : (
                <MdOutlinePoll size={36} className="sidebar-icon" />
              )}
              <span>Activities</span>
            </li>
          </Link>
          <Link onClick={() => setActiveTab("claim")} to="/claim">
            <li
              className={`sidebar-menu-item ${
                activeTab === "claim" ? "active" : ""
              }`}
            >
              {activeTab === "claim" ? (
                <HiCurrencyDollar size={36} className="sidebar-icon" />
              ) : (
                <HiOutlineCurrencyDollar size={36} className="sidebar-icon" />
              )}
              <span>Claim / Assets</span>
            </li>
          </Link>
          <Link onClick={() => setActiveTab("transfer")} to="/transfer">
            <li
              className={`sidebar-menu-item ${
                activeTab === "transfer" ? "active" : ""
              }`}
            >
              <GoArrowSwitch
                style={{ marginRight: "5px" }}
                size={32}
                className="sidebar-icon"
              />
              <span>Transfer</span>
            </li>
          </Link>
          <Link onClick={() => setActiveTab("mint")} to="/mint">
            <li
              className={`sidebar-menu-item ${
                activeTab === "mint" ? "active" : ""
              }`}
            >
              {activeTab === "mint" ? (
                <RiLoginCircleFill size={40} className="sidebar-icon" />
              ) : (
                <RiLoginCircleLine size={38} className="sidebar-icon" />
              )}
              <span>Mint</span>
            </li>
          </Link>
          <Link onClick={() => setActiveTab("info")} to="/info">
            <li
              className={`sidebar-menu-item ${
                activeTab === "info" ? "active" : ""
              }`}
            >
              {activeTab === "info" ? (
                <IoIosInformationCircle
                  size={40}
                  style={{ marginLeft: "-4px" }}
                  className="sidebar-icon"
                />
              ) : (
                <IoIosInformationCircleOutline
                  size={40}
                  style={{ marginLeft: "-4px" }}
                  className="sidebar-icon"
                />
              )}
              <span>Info</span>
            </li>
          </Link>
        </ul>

        {/* Enable Animation Toggle */}
        {/* <div className="toggle-animation-container">
          <AnimationBtn onToggleAnimation={onToggleAnimation} />
        </div> */}
      </div>
    </div>
  );
};

export default HeaderAfterAuth;
