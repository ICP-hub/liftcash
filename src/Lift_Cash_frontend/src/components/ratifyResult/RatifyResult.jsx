import React from "react";
import "./RatifyResult.css";

const RatifyResult = () => {
  const ratifyResult = { Yes: 20, No: 10 };
  return (
    <div className="ratify-result-main-card-div">
      <h1 className="ratify-result-card-h1">Woohoo!</h1>
      <p className="ratify-result-card-p-top">
        Thanks for participating in this week's Ratify
      </p>
      <h2 className="ratify-result-card-h2">Ratify Result</h2>
      <div className="ratify-result-container">
        <div className="ratify-result-card-container">
          <span className="ratify-result-card">
            <h2>{ratifyResult.Yes}</h2>
            Yes
          </span>
        </div>
        <div className="ratify-result-card-container">
          <span className="ratify-result-card ">
            <h2>{ratifyResult.No}</h2>
            No
          </span>
        </div>
      </div>

      <p className="ratify-result-card-p-bottom">
        The vote has been ratified, enabling participants to claim an additional
        50% of their weekly claim potential.
      </p>
      <h1 className="ratify-result-card-last-h1">
        See you soon for the Survey
      </h1>
    </div>
  );
};

export default RatifyResult;
