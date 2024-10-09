import React, { useState } from "react";
import Modal from '../components/Modal';
import AuthComponent from "../components/AuthComponent";

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
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-center">
      {/* Logo */}
      <div className="mb-8 ">
        <img
          src="https://plus.unsplash.com/premium_photo-1669323925693-b27e909a670d?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Lift Cash Logo"
          className="w-24 mx-24 rounded-full"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700">Welcome to the</h1>
      <h2 className="text-6xl font-bold text-blue-400 mt-2">Lift Cash</h2>

      {/* Subtext */}
      <p className="mt-4 text-lg text-gray-700">
        Access the Lift Cash Economic System here:
      </p>

      {/* Connect Wallet Button */}
      <button
        onClick={openModal}
        className="mt-6 px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50"
      >
        Connect Wallet
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AuthComponent closeModal={closeModal}/>
      </Modal>

      {/* Additional Info */}
      <p className="mt-6 text-gray-500">
        For more info visit{" "}
        <a
          href="https://freeos.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          freeos.io
        </a>
      </p>
      {/* image */}
      <div className="m-4 rounded-lg">
        <img
          src="https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="images"
          className="w-56 h-36"
        />
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center mt-10">
        <label className="flex items-center space-x-3">
          {/* Toggle button */}
          <div
            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${isAnimationEnabled ? "bg-blue-500" : ""
              }`}
            onClick={handleToggle}
          >
            {/* Circle inside the toggle */}
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isAnimationEnabled ? "translate-x-6" : ""
                }`}
            />
          </div>
          <span className="text-gray-600">Enable Animation</span>
        </label>
      </div>

      {/* Version Text */}
      <div className="absolute top-4 right-4 text-gray-500 text-sm">v0.1.0</div>
    </div>
  );
};

export default LoginPage;
