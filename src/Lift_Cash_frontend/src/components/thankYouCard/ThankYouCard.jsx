import React, { useEffect, useState } from "react";
import "./ThankYouCard.css";
import shape6 from "../../assets/images/shape-6.svg";
import { useNavigate } from "react-router-dom";
import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";
import useConvertToMinutes from "../../hooks/ useConvertToMinutes";

const ThankYouCard = ({ remainingTime, type, onTimeUp }) => {
  const navigate = useNavigate();

  const formattedTime = useFormattedTimeLeft(remainingTime);

  useEffect(() => {
    console.log("formatted time in Thankyou card =>", formattedTime);
    if (formattedTime === "0 mins") {
      onTimeUp();
    }
  }, [formattedTime]);

  // Define texts conditionally based on the type prop
  const texts = {
    header:
      type === "Survey"
        ? "Woohoo!"
        : type === "Ratify"
        ? "Yay , you did it"
        : "Yay , you did it",
    participation: `Thanks for participating in this week's ${
      type === "Survey"
        ? "Survey"
        : type === "Ratify"
        ? "Ratification "
        : "vote"
    }`,
    nextStep:
      type === "Survey"
        ? "The Weekly Vote"
        : type === "Ratify"
        ? "The Ratification Result"
        : "The Ratification Vote",
    completion: `Completing the ${
      type === "Survey"
        ? "vote"
        : type === "Ratify"
        ? "Ratification Result"
        : "Ratification Vote"
    } enables you to claim an additional ${
      type === "Survey" ? "70" : type === "Ratify" ? "10" : "10"
    }% of your weekly claim potential`,
    farewell: `See you soon for the ${
      type === "Survey"
        ? "Vote"
        : type === "Ratify"
        ? "Ratification Result"
        : "Ratification Vote"
    }`,
  };

  return (
    <div className="thank-you-main-card-div">
      <h1 className="thank-you-card-h1">{texts.header}</h1>
      <p className="thank-you-card-p-top">{texts.participation}</p>
      <h2 className="thank-you-card-h2">You have a 'CLAIM' waiting</h2>
      <div className="thank-you-card-image-container">
        <img src={shape6} alt="Thank You" className="thank-you-card-image" />
        <div className="thank-you-card-btn-container">
          <button
            className="thank-you-card-btn "
            onClick={() => navigate("/claim")}
          >
            Go to the <br />
            <span className="thank-you-card-btn-span">
              CLAIM <br /> PAGE
            </span>
          </button>
        </div>
      </div>

      <h2 className="thank-you-card-h2 thank-you-card-h2-bottom">
        Next: {texts.nextStep}
      </h2>
      <h2 className="thank-you-card-h2-time">
        Starts In :{" "}
        <span className="container-survey-timeleft">{formattedTime}</span>
      </h2>
      <p className="thank-you-card-p-bottom">{texts.completion}</p>
      <h1 className="thank-you-card-last-h1">{texts.farewell}</h1>
    </div>
  );
};

export default ThankYouCard;
