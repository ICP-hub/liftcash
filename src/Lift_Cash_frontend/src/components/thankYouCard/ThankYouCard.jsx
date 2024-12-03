import React, { useEffect, useState } from "react";
import "./ThankYouCard.css";
import shape6 from "../../assets/images/shape-6.svg";
import SurveyResult from "../surveyResult/SurveyResult";
import RatifyCard from "../ratify/RatifyCard";
import { useNavigate } from "react-router-dom";
import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";
import useConvertToMinutes from "../../hooks/ useConvertToMinutes";
import RatifyResult from "../ratifyResult/RatifyResult";

const ThankYouCard = ({ remainingTime, type }) => {
  const navigate = useNavigate();
  // const convertToMinute = useConvertToMinutes(remainingTime) || 0; //remaining time (string) convert into minutes (decimal)
  console.log("remainingTime =>", remainingTime);
  // console.log("converted to minuites => ", convertToMinute);

  // // const initialTime = convertToMinute;

  // const [initialTime, setInitialTime] = useState(convertToMinute);

  // const formattedTime = useFormattedTimeLeft(initialTime);

  // useEffect(() => {
  //   console.log("formatted time =>", formattedTime);
  // }, [formattedTime]);

  // Define texts conditionally based on the type prop
  const texts = {
    header:
      type === "survey"
        ? "Woohoo!"
        : type === "retify"
        ? "Yay , you did it"
        : "Yay , you did it",
    participation: `Thanks for participating in this week's ${
      type === "survey"
        ? "survey"
        : type === "retify"
        ? "Ractification "
        : "vote"
    }`,
    nextStep:
      type === "survey"
        ? "The Weekly Vote"
        : type === "retify"
        ? "The Ractification Result"
        : "The Ratification Vote",
    completion: `Completing the ${
      type === "survey"
        ? "vote"
        : type === "retify"
        ? "Ractification Result"
        : "Ratification Vote"
    } enables you to claim an additional ${
      type === "survey" ? "70" : type === "retify" ? "10" : "10"
    }% of your weekly claim potential`,
    farewell: `See you soon for the ${
      type === "survey"
        ? "Vote"
        : type === "retify"
        ? "Ractification Result"
        : "Ratification Vote"
    }`,
  };

  if (remainingTime !== "0 mins") {
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
        <h2 className="thank-you-card-h2-time">Starts In {remainingTime}</h2>
        <p className="thank-you-card-p-bottom">{texts.completion}</p>
        <h1 className="thank-you-card-last-h1">{texts.farewell}</h1>
      </div>
    );
  }
  // if (formattedTime === "0 mins" && type === "survey") {
  //   <SurveyResult />;
  // }
  // if (formattedTime === "0 mins" && type === "vote") {
  //   <RatifyCard />;
  // }
  // if (formattedTime === "0 mins" && type !== "retify") {
  //   <RatifyResult />;
  // }
};

export default ThankYouCard;
