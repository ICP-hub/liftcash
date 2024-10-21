import React, { useState, useEffect } from "react";
import "./ThankYouCard.css";
import SVG from "../../assets/images/SVG.png";
import SurveyResult from "../surveyResult/SurveyResult";

const ThankYouCard = () => {
  const [timeLeft, setTimeLeft] = useState(1);
  const [formattedTime, setFormattedTime] = useState("");

  // Function to format time based on remaining hours
  const formatTime = (time) => {
    if (time >= 24) {
      const days = Math.floor(time / 24);
      return `${days} ${days === 1 ? "day" : "days"}`;
    } else {
      return `${time} ${time === 1 ? "hour" : "hours"}`;
    }
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
      <h1 className="thank-you-card-h1">Your survey is completed</h1>
      <h2 className="thank-you-card-h2">
        Results will be declared after: {formattedTime}
      </h2>
      <img src={SVG} alt="Thank You" className="thank-you-card-image" />
      <h2 className="thank-you-card-h2 rounded-b-lg ">
        Thank You For Your Feedback
      </h2>
    </div>
  );
};

export default ThankYouCard;
