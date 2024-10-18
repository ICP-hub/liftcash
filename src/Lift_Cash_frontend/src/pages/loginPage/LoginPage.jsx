import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import AuthComponent from "../../components/AuthComponent";
import "./LoginPage.css";
import { useAuthClient } from "../../utils/useAuthClient";
import logo from "../../assets/images/logo.png"
import svg from "../../assets/images/SVG.png"
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // State to manage toggle switch
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);
  const { isAuthenticated, logout } = useAuthClient();

  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Function to toggle the animation setting
  const handleToggle = () => {
    setIsAnimationEnabled(!isAnimationEnabled);
  };
  const handleConnectionToWallte = () => {
    console.log("Connected to Wallet");
  };
  return (
    <div className="login-main-conatiner ">
      {/* Logo */}
      <div className="login-logo-div ">
        <img
          src={logo}
          alt="Lift Cash Logo"
          className="login-logo-img"
        />
        <p className="text-3xl mt-2 font-bold tracking-normal text-[#ff4500]">
          Lift Cash
        </p>
      </div>

      {/* Title */}
      <h1 className="login-title-h1">Welcome to the</h1>
      <h2 className="login-title-h2">Lift Cash Governance App</h2>

      {/* Subtext */}
      <p className="login-subtext-p">
        Access the Lift Cash Economic System here:
      </p>

      {/* Connect Wallet Button */}

      {
        isAuthenticated ?
          <button onClick={()=>{
            logout();
            navigate("/")
          }} className="login-btn">
            Logout
          </button>
          :
          <button onClick={openModal} className="login-btn">
            Connect Wallet
          </button>
      }

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AuthComponent closeModal={closeModal} />
      </Modal>

      {/* Additional Info */}
      <p className="login-additional-info">
        For more info visit{" "}
        <a
          href="https://lift.cash/"
          target="_blank"
          rel="noopener noreferrer"
          className="login-additional-info-link"
        >
          lift.cash
        </a>
      </p>
      {/* bottom image */}
      <div className="login-bottom-img-div">
        <img
          src={svg}
          alt="images"
          className="login-bottom-img"
        />
      </div>

      {/* Toggle Switch */}
      <div className="login-toggle-switch-main">
        <label className="login-toggle-switch-lable">
          {/* Toggle button */}
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${isAnimationEnabled ? "bg-[#6cb2eb]" : "bg-gray-300"
              }`}
            onClick={handleToggle}
          >
            {/* Circle inside the toggle */}
            <div
              className={` login-toggle-animation ${isAnimationEnabled ? "translate-x-6 bg-[#00A1ED]" : "bg-white"
                }`}
            />
          </div>
          <span className="login-bottom-span">Enable Animation</span>
        </label>
      </div>

      {/* Version Text */}
      <div className="login-version-text">v0.1.0</div>
    </div>
  );
};

export default LoginPage;
