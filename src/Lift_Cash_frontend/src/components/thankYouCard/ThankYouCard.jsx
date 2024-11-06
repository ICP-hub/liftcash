import React from "react";
import "./ThankYouCard.css";
import shape6 from "../../assets/images/shape-6.svg";
import SurveyResult from "../surveyResult/SurveyResult";
import { useNavigate } from "react-router-dom";
import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";
import useConvertToMinutes from "../../hooks/ useConvertToMinutes";

const ThankYouCard = ({ remainingTime }) => {
  const navigate = useNavigate();
  const convertToMinute = useConvertToMinutes(remainingTime); //remaining time (string) convert into minutes (decimal)

  //initial time in minutes
  const manualTime = 1;

  //Add converted time to manual input
  const initialTime = convertToMinute + manualTime;

  const formattedTime = useFormattedTimeLeft(initialTime);

  return formattedTime == "0 mins" ? (
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
        Next: The Weekly Vote
      </h2>
      <h2 className="thank-you-card-h2-time">Starts In {formattedTime}</h2>
      <p className="thank-you-card-p-bottom">
        Completing the vote enables you to claim an additional 70% of your
        weekly claim potential
      </p>
      <h1 className="thank-you-card-last-h1">See you soon for the VOTE</h1>
    </div>
  );
};

export default ThankYouCard;
