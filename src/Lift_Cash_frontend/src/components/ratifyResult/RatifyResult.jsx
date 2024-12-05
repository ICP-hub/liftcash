import React, { useEffect, useState } from "react";
import "./RatifyResult.css";
import { useSelector } from "react-redux";
import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";

const RatifyResult = ({ timeLeft, onTimeUp }) => {
  const [agree, setAgree] = useState(0);
  const [disagree, setDisagree] = useState(0);

  const communityActor = useSelector(
    (currState) => currState?.actors?.actors?.communityActor
  );

  const formattedTimeLeft = useFormattedTimeLeft(timeLeft);

  useEffect(() => {
    console.log("actor in ratify result card =>", communityActor);
    fetchRatifyResult();
  }, [communityActor]);

  useEffect(() => {
    console.log("Formatted time in RR : ", formattedTimeLeft);
    if(formattedTimeLeft === "0 mins"){
      onTimeUp();
    }
  }, [formattedTimeLeft]);

  const fetchRatifyResult = async () => {
    try {
      await communityActor
        .get_ratification_results()
        .then((response) => {
          console.log("Ratify Result: ", response);
          for (let i = 0; i < response.length; i++) {
            if (response[i][0] === "Yes") {
              setAgree(Number(response[i][1]));
            } else if (response[i][0] === "No") {
              setDisagree(Number(response[i][1]));
            }
          }
        })
        .catch((error) => {
          console.error("Error while fetching ratify result : ", error);
        });
    } catch (error) {
      console.error("Error fetching ratify result : ", error);
    }
  };

  return (
    <div className="ratify-result-main-card-div">
      <h1 className="ratify-result-card-h1">Woohoo!</h1>
      <p className="ratify-result-card-p-top">
        Thanks for participating in this week's Ratification
      </p>
      <h2 className="ratify-result-card-h2">Ratification Result</h2>
      <div className="ratify-result-container">
        <div className="ratify-result-card-container">
          <span className="ratify-result-card">
            <h2>{agree}</h2>
            Agree
          </span>
        </div>
        <div className="ratify-result-card-container">
          <span className="ratify-result-card">
            <h2>{disagree}</h2>
            Disagree
          </span>
        </div>
      </div>
      <p className="ratify-result-card-p-bottom">
        The vote has been ratified, enabling participants to claim an
        additional 10% of their weekly claim potential.
      </p>
      <div className="container-survey-time">
        Result Closes in:{" "}
        <span className="container-survey-timeleft">{formattedTimeLeft}</span>
      </div>
      <h1 className="ratify-result-card-last-h1">
        See you soon for the Survey
      </h1>
    </div>
  );

};

export default RatifyResult;
