import React from "react";
import "./ThankYouCard.css";
import shape6 from "../../assets/images/shape-6.svg";
import SurveyResult from "../surveyResult/SurveyResult";
import RatifyCard from "../ratify/RatifyCard";
import { useNavigate } from "react-router-dom";
import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";
import useConvertToMinutes from "../../hooks/ useConvertToMinutes";

const ThankYouCard = ({ remainingTime, type }) => {
  const navigate = useNavigate();
  const convertToMinute = useConvertToMinutes(remainingTime) || 0; //remaining time (string) convert into minutes (decimal)

  //initial time (manual) in minutes
  // const manualTime = 1;

  //Add converted time to manual input
  // const initialTime = convertToMinute + manualTime;
  const initialTime = convertToMinute;

  const formattedTime = useFormattedTimeLeft(initialTime);

  // Define texts conditionally based on the type prop
  const texts = {
    header: type === "survey" ? "Woohoo!" : "Yay , you did it",
    participation: `Thanks for participating in this week's ${
      type === "survey" ? "survey" : "vote"
    }`,
    nextStep: type === "survey" ? "The Weekly Vote" : "The Ratification Vote",
    completion: `Completing the ${
      type === "survey" ? "vote" : "Ratification Vote"
    } enables you to claim an additional ${
      type === "survey" ? "70" : "10"
    }% of your weekly claim potential`,
    farewell: `See you soon for the ${
      type === "survey" ? "Vote" : "Ratification Vote"
    }`,
  };

  return formattedTime === "0 mins" ? (
    type === "survey" ? (
      <SurveyResult />
    ) : (
      <RatifyCard />
    )
  ) : (
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
      <h2 className="thank-you-card-h2-time">Starts In {formattedTime}</h2>
      <p className="thank-you-card-p-bottom">{texts.completion}</p>
      <h1 className="thank-you-card-last-h1">{texts.farewell}</h1>
    </div>
  );
};

export default ThankYouCard;
