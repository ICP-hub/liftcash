import React, { useEffect, useState } from "react";
import "./SurveyResult.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";

const SurveyResult = ({ timeLeft, onTimeUp }) => {

  const formattedTimeLeft = useFormattedTimeLeft(timeLeft);

  const communityActor = useSelector(
    (state) => state?.actors?.actors?.communityActor
  );

  useEffect(() => {
    console.log("Formated time in SR ::: ", formattedTimeLeft);
    if(formattedTimeLeft === "0 mins"){
      onTimeUp();
    }
  }, [formattedTimeLeft]);

  useEffect(() => {
    console.log("actor on survey result page : ", communityActor);
  }, [communityActor]);

  useEffect(() => {
    fetchSurveyResults();
  }, []);


  const [surveyResults, setSurveyResults] = useState([]);
  const [question, setQuestion] = useState([
    "Where do you feel the Bitcoin & Wider crypto markets are heading?",
    "How long before the crypto market changes direction?",
    "Where do you feel the LIFTCASH market is heading?",
    "How long before the LIFTCASH market changes direction?",
    "What are the  priorities for voting this week ?",
  ]);


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
          className={` ${index % 2 === 0
              ? "survey-result-container"
              : `bg-blue-100  survey-result-container`
            }`}
        >
          <h2 className="survey-result-question">{`Q${data.id}: ${data.question}`}</h2>
          <div className="survey-result-options-container">
            <p className={"font-bold"} key={index}>
              {data.results}
            </p>
          </div>
        </div>
      ))}

    </div>
  );
};

export default SurveyResult;