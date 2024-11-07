import "./Vote.css";
import React, { useEffect, useState } from "react";
import SurveyResult from "../surveyResult/SurveyResult";
import { useAuthClient } from "../../utils/useAuthClient";
import { voteQuestions } from "../../pages/activitiesPage/constants/Vote";
import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";
import ThankYouCard from "../thankYouCard/ThankYouCard";

const Vote = () => {
  const { actors } = useAuthClient();

  const callFunction = async () => {
    const result = await actors?.communityActor?.get_weekly_vote_results();
    console.log("Total Claim:", result);
  };

  const [percent, setPercent] = useState({});

  const [isVote, setIsVote] = useState(true);
  const [isBackToSurveyResult, setIsBackToSurveyResult] = useState(false);
  const formattedTimeLeft = useFormattedTimeLeft(1);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    // Initialize percent state with default values
    const initialPercent = {};
    voteQuestions.forEach((data) => {
      initialPercent[data.id] = data.slider.default;
    });
    setPercent(initialPercent);
    setRemainingTime(formattedTimeLeft);
  }, []);

  // Handle percentage change for each question
  const handlePercentChange = (id, value) => {
    setPercent((prevPercent) => ({
      ...prevPercent,
      [id]: value, // Update only the relevant id's value
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(percent).length < voteQuestions.length) {
      alert("Please complete the Vote before submitting.");
      return;
    }
    console.log("Selected Vote Data:", percent);
    callFunction();
    setIsVote(false);
  };

  // Conditional rendering
  return isVote && formattedTimeLeft !== "0 mins" ? (
    isBackToSurveyResult ? (
      <SurveyResult />
    ) : (
      <div>
        <div className="vote-main-div">
          <div className="vote-header-div">
            <p
              className="navigate-to-survey-result"
              onClick={() => setIsBackToSurveyResult(true)}
            >
              Back to survey results
            </p>
            <h1 className="vote-title">Welcome to the Vote</h1>
            <p className="vote-sub-title">
              Complete for 50% of your weekly Claim
            </p>
          </div>

          <div className="vote-time-description">
            <p className="vote-remaining-time">
              Vote Closes in: {formattedTimeLeft}
            </p>
            <p className="vote-description">
              Thanks for being active in stewarding this economy. Besides
              empowering your own financial freedom, your answers also affect
              the FREEOS community. For more info{" "}
              <a href="#" className="vote-link">
                click here
              </a>
              .
            </p>

            <h1 className="vote-title bg-blue-200 py-5">
              Ready to Vote? Let's start.
            </h1>
            {voteQuestions.map((data) => (
              <div key={data.id}>
                <div className="vote-card-container">
                  <h2 className="vote-card-title ">{data.title}</h2>
                  <p className="vote-card-sub-title">
                    {data.issuance.title}: {data.issuance.amount}
                  </p>
                  <p className="vote-card-question">{data.question}</p>
                  <p className="vote-card-question-description">
                    {data.description}
                  </p>

                  {/* Slider Input */}
                  <div className="vote-input-container">
                    <input
                      type="range"
                      step={data.slider.unit === "USD" ? "0.00001" : "1"}
                      min={data.slider.min}
                      max={data.slider.max}
                      value={percent[data.id] || data.slider.default}
                      className="vote-slider"
                      onChange={(event) =>
                        handlePercentChange(data.id, event.target.value)
                      }
                    />
                  </div>
                  <div className="vote-display-percent">
                    <p className="sliderunitfirst">
                      {data.slider.min} {data.slider.unit}
                    </p>
                    <p className="sliderunitsecond">
                      {data.slider.max} {data.slider.unit}
                    </p>
                  </div>
                </div>

                {/* Manual Input */}
                <div className="vote-manual-input-container">
                  <p className="vote-manual-input-p">
                    Or manually enter amount:
                  </p>
                  <div className="vote-input-container">
                    <input
                      type="number"
                      step={data.slider.unit === "USD" ? "0.00001" : "1"}
                      className="vote-input"
                      value={percent[data.id] || data.slider.default}
                      min={data.slider.min}
                      max={data.slider.max}
                      onChange={(event) =>
                        handlePercentChange(data.id, event.target.value)
                      }
                    />
                    <span className="vote-percent-sign">
                      {data.slider.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="vote-bottom-instruction">
            Almost done- Just check and <br /> 'Submit your Vote'
          </p>
          <div className="vote-btn-div">
            <button className="vote-btn" onClick={handleSubmit}>
              Submit Vote
            </button>
          </div>
        </div>
      </div>
    )
  ) : (
    <ThankYouCard remainingTime={remainingTime} type={"vote"} />
  );
};

export default Vote;
