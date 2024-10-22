import React, { useState, useEffect } from "react";
import "./ThankYouCard.css";
import shape6 from "../../assets/images/shape-6.svg";
import SurveyResult from "../surveyResult/SurveyResult";
import { useNavigate } from "react-router-dom";

const ThankYouCard = () => {
  const [timeLeft, setTimeLeft] = useState(0); // Change this value as needed for testing
  const [formattedTime, setFormattedTime] = useState("");

  const navigate = useNavigate();

  // Function to format time based on remaining hours
  const formatTime = (time) => {
    const days = Math.floor(time / 24);
    const hours = time % 24; // Get the remaining hours after calculating days
    const formattedDays =
      days > 0 ? `${days} ${days === 1 ? "day" : "days"}` : "";
    const formattedHours =
      hours > 0 ? `${hours} ${hours === 1 ? "hour" : "hours"}` : "";

    // Combine days and hours, ensuring proper spacing
    return `${formattedDays}${
      formattedDays && formattedHours ? " , " : ""
    }${formattedHours}`.trim();
  };

  // Update the formatted time whenever timeLeft changes
  useEffect(() => {
    setFormattedTime(formatTime(timeLeft));
  }, [timeLeft]);

  // Countdown effect to decrease time left
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 3600000); // Decrease every hour (3600000 milliseconds)

      return () => clearInterval(timer); // Cleanup on component unmount
    }
  }, [timeLeft]);

  return timeLeft === 0 ? (
    <SurveyResult />
  ) : (
    <div className="thank-you-main-card-div">
      <h1 className="thank-you-card-h1">Woohoo!</h1>
      <p className="thank-you-card-p-top">
        Thanks for participating in this week's survey
      </p>
      <h2 className="thank-you-card-h2">You have a 'CLAIM' waiting</h2>
      <div className="thank-you-card-image-container">
        <img src={shape6} alt="Thank You" className="thank-you-card-image" />
        <div className="thank-you-card-btn-container">
          <button
            className="thank-you-card-btn"
            onClick={() => navigate("/claim")}
          >
            Claim
          </button>
        </div>
      </div>

      <h2 className="thank-you-card-h2 thank-you-card-h2-bottom">
        Next: The Weekly Vote
      </h2>
      <h2 className="thank-you-card-h2-time">Starts In {formattedTime}</h2>
      <p className="thank-you-card-p-bottom">
        Completing the vote enables you to claim an additional 50% of your
        weekly claim potential
      </p>
      <h1 className="thank-you-card-last-h1">See you soon for the VOTE</h1>
    </div>
  );
};

export default ThankYouCard;
