import React from "react";
import "./AccessDenied.css";

const AccessDenied = () => {
  return (
    <div className="access-denied-container">
      <div className="access-denied-box">
        <div className="border-b rounded-t-lg px-2 gap-2 border-2 bg-gray-300 w-full py-3 flex float-start">
          <div className="bg-red-500 rounded-full w-2 h-2"></div>
          <div className="bg-yellow-500 rounded-full w-2 h-2"></div>
          <div className="bg-green-500 rounded-full w-2 h-2"></div>
        </div>
        <div className="innerContainer">
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="access-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-11h-2V6h2v3zm0 4h-2v6h2v-6z" />
            </svg>
          </div>
          <h1 className="error-title">OOOH! 403, ACCESS DENIED</h1>
          <p className="error-message">
            Sorry about that, but you don’t have permission to access this page.
          </p>
          <p className="navigation-text">Fortunately, you can go back to:</p>
          <button
            className="navigation-button"
            onClick={() => window.history.back()}
          >
            Previous Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
