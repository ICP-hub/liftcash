import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import AuthComponent from "../../components/AuthComponent";
import "./LoginPage.css";

const LoginPage = () => {
  // State to manage toggle switch
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);

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
          src="https://plus.unsplash.com/premium_photo-1669323925693-b27e909a670d?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Lift Cash Logo"
          className="login-logo-img"
        />
      </div>

      {/* Title */}
      <h1 className="login-title-h1">Welcome to the</h1>
      <h2 className="login-title-h2">Lift Cash</h2>

      {/* Subtext */}
      <p className="login-subtext-p">
        Access the Lift Cash Economic System here:
      </p>

      {/* Connect Wallet Button */}
      <button onClick={openModal} className="login-btn">
        Connect Wallet
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AuthComponent />
      </Modal>

      {/* Additional Info */}
      <p className="login-additional-info">
        For more info visit{" "}
        <a
          href="https://freeos.io"
          target="_blank"
          rel="noopener noreferrer"
          className="login-additional-info-link"
        >
          freeos.io
        </a>
      </p>
      {/* bottom image */}
      <div className="login-bottom-img-div">
        <img
          src="https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="images"
          className="login-bottom-img"
        />
      </div>

      {/* Toggle Switch */}
      <div className="login-toggle-switch-main">
        <label className="login-toggle-switch-lable">
          {/* Toggle button */}
          <div
            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
              isAnimationEnabled ? "bg-blue-500" : ""
            }`}
            onClick={handleToggle}
          >
            {/* Circle inside the toggle */}
            <div
              className={` login-toggle-animation ${
                isAnimationEnabled ? "translate-x-6" : ""
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
