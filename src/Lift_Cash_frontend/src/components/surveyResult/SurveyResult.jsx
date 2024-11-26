import React, { useEffect, useState } from "react";
import "./SurveyResult.css";
// import { surveyResults } from "../../pages/activitiesPage/constants/SurveyResult";
import Vote from "../vote/Vote";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";
import ThankYouCard from "../thankYouCard/ThankYouCard";

const SurveyResult = () => {
  const [timeLeftInMinutes, setTimeLeftInMinutes] = useState(480); // initial time in minutes

  const formattedTimeLeft = useFormattedTimeLeft(timeLeftInMinutes);

  function nanoToMin(nano) {
    const secondsInMinute = 60;
    const nanoToSeconds = 1e9; // 1 second = 1 billion nanoseconds
    const nanoInMinute = nanoToSeconds * secondsInMinute; // 1 minute = 60 billion nanoseconds

    return nano / nanoInMinute;
  }

  const getPhaseInfo = async () => {
    try {
      await communityActor
        .get_current_phase_info()
        .then((res) => {
          console.log("Phase Info:", res[0]);
          console.log("Time Left in Nano : ", parseInt(res[1]));
          const timeLeft = nanoToMin(parseInt(res[1]));
          setTimeLeftInMinutes(timeLeft);
        })
        .catch((err) => {
          console.log("Error getting phase info:", err);
        });
    } catch (error) {
      console.error("Error getting phase info:", error);
    }
  };

  const [vote, setVote] = useState(false);
  const [surveyResults, setSurveyResults] = useState([]);
  const [question, setQuestion] = useState([
    "Where do you feel the Bitcoin & Wider crypto markets are heading?",
    "How long before the crypto market changes direction?",
    "Where do you feel the FREEOS market is heading?",
    "How long before the FREEOS market changes direction?",
    "What are the  priorities for voting this week ?",
  ]);

  const communityActor = useSelector(
    (state) => state?.actors?.actors?.communityActor
  );

  function sortSurveyResults(results) {
    return results.sort((a, b) => {
      const idA = parseInt(a[0].substring(1));
      const idB = parseInt(b[0].substring(1));
      return idA - idB; // Sort in ascending order based on the number
    });
  }

  const fetchSurveyResults = async () => {
    try {
      await communityActor
        ?.get_survey_results()
        .then((response) => {
          console.log("Survey Results: ", response);

          const sortedResults = sortSurveyResults(response);

          console.log("sortedResults :", sortedResults);

          let finalResults = [];

          for (let i = 0; i < sortedResults.length; i++) {
            let tempObj = {
              id: i + 1,
              question: question[i],
              results: sortedResults[i][1],
            };

            finalResults.push(tempObj);
          }

          console.log("finalResults :", finalResults);

          setSurveyResults(finalResults);
        })
        .catch((error) => {
          console.error("Error fetching survey results", error);
          toast.error("Error fetching survey results");
        });
    } catch (error) {
      console.error("Error fetching survey results", error);
      // toast.error("Error fetching survey results");
    }
  };

  useEffect(() => {
    console.log("Formated time in SR ::: ", formattedTimeLeft);
  }, [formattedTimeLeft]);

  useEffect(() => {
    getPhaseInfo();
    console.log("actor on survey result page : ", communityActor);
  }, [communityActor]);

  useEffect(() => {
    fetchSurveyResults();
  }, []);

  if (formattedTimeLeft !== "0 mins") {
    return (
      <div className="survey-result-main-div">
        <h1 className="survey-result-h1"> This Week's Survey Results</h1>
        <div className="container-survey-time">
          Next Phase will start in :{" "}
          <span className="container-survey-timeleft">{formattedTimeLeft}</span>
        </div>
        <p className="survey-result-p">
          {" "}
          Thank you to everyone who participated in the weekly survey. This
          week's survey results are:
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
              {/* {data.results.map((result, index) => (
            <p className={index === 0 ? "font-bold" : ""} key={index}>
              {result.percentage ? (
                <>
                  {result.percentage} {result.label}
                </>
              ) : (
                result.label
              )}
            </p>
          ))} */}
              <p className={"font-bold"} key={index}>
                {data.results}
              </p>
            </div>
          </div>
        ))}

        <div className="survey-result-btn-div">
          <button className="survey-result-btn" onClick={() => setVote(true)}>
            Start this week's vote (RM after testing)
          </button>
        </div>
      </div>
    );
  }
  if (formattedTimeLeft === "0 mins") {
    return <Vote />;
  }
};

export default SurveyResult;
