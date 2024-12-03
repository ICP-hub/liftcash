import React from "react";
import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="main">
      <div className="masked-text">Oops!</div>
      <div className="notfound">404 - PAGE NOT FOUND</div>
      <div className="message">
        The page you are looking for might have been removed had its name
        changed or is temporairly unavailable.
      </div>
      <button onClick={() => navigate("/activities")} className="button">
        Go to Homepage
      </button>
    </div>
  );
};

export default PageNotFound;
