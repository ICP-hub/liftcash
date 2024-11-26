import React, { useState, useEffect } from "react";
import "./ActivitiesPage.css";
import { useSelector } from "react-redux";
import RatifyCard from "../../components/ratify/RatifyCard";
import Vote from "../../components/vote/Vote";
import SurveyResult from "../../components/surveyResult/SurveyResult";
import RatifyResult from "../../components/ratifyResult/RatifyResult";
import Survey from "../../components/survey/Survey";

const ActivitiesPage = () => {
  const [phase, setPhase] = useState("");

  const communityActor = useSelector(
    (state) => state?.actors?.actors?.communityActor
  );

  const getPhaseInfo = async () => {
    try {
      await communityActor
        .get_current_phase_info()
        .then((res) => {
          console.log("Phase Info:", res[0]);
          const key = Object.keys(res[0]);
          console.log("phase =>", key[0]);
          setPhase(key[0]);
        })
        .catch((err) => {
          console.log("Error getting phase info:", err);
        });
    } catch (error) {
      console.error("Error getting phase info:", error);
    }
  };

  useEffect(() => {
    getPhaseInfo();
    console.log("actor on survey page : ", communityActor);
  }, [communityActor]);

  if (phase === "Survey") {
    return <Survey />;
  }
  if (phase === "SurveyResults") {
    return (
      <div className="flex items-center">
        <SurveyResult />;
      </div>
    );
  }
  if (phase === "Vote") {
    return <Vote />;
  }
  if (phase === "Ratify") {
    return <RatifyCard />;
  }
  if (phase === "RatifyResults") {
    return (
      <div className="flex items-center">
        <RatifyResult />;
      </div>
    );
  }
};

export default ActivitiesPage;
