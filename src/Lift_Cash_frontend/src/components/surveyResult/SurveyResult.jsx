import React, { useState } from "react";
import "./SurveyResult.css";
import { surveyResults } from "../../pages/activitiesPage/constants/SurveyResult";
import Vote from "../vote/Vote";

const SurveyResult = () => {
  const [vote, setVote] = useState(false);

  return !vote ? (
    <div className="survey-result-main-div">
      <h1 className="survey-result-h1"> This Week's Survey Results</h1>
      <p className="survey-result-p">
        {" "}
        Thank you to everyone who participated in the weekly survey. This week's
        survey results are:
      </p>

      {surveyResults.map((data, index) => (
        <div
          key={data.id}
          className={` ${
            index % 2 === 0
              ? "survey-result-container"
              : `bg-blue-100  survey-result-container`
          }`} // Alternate colors
        >
          <h2 className="survey-result-question">{`Q${data.id}: ${data.question}`}</h2>
          <div className="survey-result-options-container">
            {data.results.map((result, index) => (
              <p className={index === 0 ? "font-bold" : ""} key={index}>
                {result.percentage ? (
                  <>
                    {result.percentage} {result.label}
                  </>
                ) : (
                  result.label
                )}
              </p>
            ))}
          </div>
        </div>
      ))}
      <div className="survey-result-btn-div">
        <button className="survey-result-btn" onClick={() => setVote(true)}>
          Start this week's vote
        </button>
      </div>
    </div>
  ) : (
    <Vote />
  );
};

export default SurveyResult;
