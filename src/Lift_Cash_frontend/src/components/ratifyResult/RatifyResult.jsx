import React, { useEffect, useState } from "react";
import "./RatifyResult.css";
import { useSelector } from "react-redux";

const RatifyResult = () => {
  // const ratifyResult = { Yes: 20, No: 10 };
  const [agree, setAgree] = useState(30);
  const [disagree, setDisagree] = useState(20);


  const communityActor = useSelector(
    (currState) => currState?.actors?.actors?.communityActor
  );

  useEffect(() => {
    console.log("actor in ratify result card =>", communityActor);
  }, [communityActor])


  const fetchRatifyResult = async () => {
    try {
      await communityActor.get_ratification_results()
      .then((response) => {
        console.log("Ratify Result: ", response[1][1], response[0][1]);
        setAgree(Number(response[1][1]));
        setDisagree(Number(response[0][1]));
      })
      .catch((error) => {
        console.error("Error while fetching ratify result : ", error);
      });

    } catch (error) {
      console.error("Error fetching ratify result : ", error);
    }
  };


  useEffect(() => {
    fetchRatifyResult();
  }, []);


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
          <span className="ratify-result-card ">
            <h2>{disagree}</h2>
            Disagree
          </span>
        </div>
      </div>

      <p className="ratify-result-card-p-bottom">
        The vote has been ratification, enabling participants to claim an additional
        50% of their weekly claim potential.
      </p>
      <h1 className="ratify-result-card-last-h1">
        See you soon for the Survey
      </h1>
    </div>
  );
};

export default RatifyResult;
