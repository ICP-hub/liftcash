import React, { useState, useEffect } from "react";
import DashBoardHead from "../../components/dashboardHead/DashBoardHead";
import "./ActivitiesPage.css";
import { survey } from "./constants/Survey";
import SliderBtn from "../../components/sliderBtn/SliderBtn";
import RadioBtn from "../../components/radioBtn/RadioBtn";
import DropdownBtn from "../../components/dropdownBtn/DropdownBtn";
import ThankYouCard from "../../components/thankYouCard/ThankYouCard";
import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import RatifyCard from "../../components/ratify/RatifyCard";
import Vote from "../../components/vote/Vote";
import SurveyResult from "../../components/surveyResult/SurveyResult";
import RatifyResult from "../../components/ratifyResult/RatifyResult";
import Survey from "../../components/survey/Survey";

const ActivitiesPage = () => {
  console.log("Activities Page");

  const [timeLeftInMinutes, setTimeLeftInMinutes] = useState(1); // initial time in minutes
  const formattedTimeLeft = useFormattedTimeLeft(timeLeftInMinutes);

  const [phase, setPhase] = useState("");

  const communityActor = useSelector(
    (state) => state?.actors?.actors?.communityActor
  );

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
          const key = Object.keys(res[0]);
          console.log("phase =>", key[0]);
          console.log("Time Left in Nano : ", parseInt(res[1]));
          const timeLeft = nanoToMin(parseInt(res[1]));
          setTimeLeftInMinutes(timeLeft);
          console.log("timeLeft =>", timeLeft);
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
    return <Survey formattedTimeLeft={formattedTimeLeft} />;
  }
  if (phase === "SurveyResults") {
    return (
      <div className="flex items-center">
        <SurveyResult formattedTimeLeft={formattedTimeLeft} />;
      </div>
    );
  }
  if (phase === "Vote") {
    return <Vote formattedTimeLeft={formattedTimeLeft} />;
  }
  if (phase === "Ratify") {
    return <RatifyCard formattedTimeLeft={formattedTimeLeft} />;
  }
  if (phase === "RatifyResults") {
    return (
      <div className="flex items-center">
        <RatifyResult formattedTimeLeft={formattedTimeLeft} />;
      </div>
    );
  }
};

export default ActivitiesPage;
