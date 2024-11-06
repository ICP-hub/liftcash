import React, { useState } from "react";
import DashBoardHead from "../../components/dashboardHead/DashBoardHead";
import "./ActivitiesPage.css";
import { survey } from "./constants/Survey";
import SliderBtn from "../../components/sliderBtn/SliderBtn";
import RadioBtn from "../../components/radioBtn/RadioBtn";
import DropdownBtn from "../../components/dropdownBtn/DropdownBtn";
import ThankYouCard from "../../components/thankYouCard/ThankYouCard";
import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";

const ActivitiesPage = () => {
  const [selectedData, setSelectedData] = useState({});
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  const formattedTimeLeft = useFormattedTimeLeft(1); // initial time in minutes
  const [remainingTime, setRemainingTime] = useState(null); //  state for remaining time

  // Handler to update selected data based on question id
  const handleSelect = (id, value) => {
    setSelectedData(
      (prev) => ({
        ...prev,
        [id]: value,
      }),
      []
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    if (Object.keys(selectedData).length < survey.length) {
      alert("Please complete the survey before submitting.");
      return;
    }
    console.log("Selected Survey Data:", selectedData);
    setIsSurveyCompleted(true);
    setRemainingTime(formattedTimeLeft);
  };

  return (
    <div className="activities-primary-div ">
      <DashBoardHead />

      {/* Conditional rendering based on survey completion */}
      {!isSurveyCompleted && formattedTimeLeft != "0 mins" ? (
        <div className="activities-primary-container">
          <h2 className="container-title">Welcome to the Survey </h2>
          <p className="container-description">
            Participate for 20% of your weekly Claim
          </p>
          <div className="container-survey-time">
            Survey Closes in:{" "}
            <span className="container-survey-timeleft">
              {formattedTimeLeft}
            </span>
          </div>
          <p className="container-survey-secondary-description">
            This Survey helps the community of Lift Cash participants know what
            each other is thinking, so they can act in unison. For more info{" "}
            <br />
            <a className="container-survey-secondary-description-link">
              click here.
            </a>
          </p>
          <h3 className="conatiner-start-survey"> Ready? Let's start</h3>
          {survey.map((item) => (
            <div key={item.id} className="mb-5">
              <h3 className="container-survey-question-title">
                {`Q${item.id}: ${item.title}`}
              </h3>
              <p className="container-survey-question-description">
                {item.description}
              </p>
              {item.type === "radiobutton" && (
                <RadioBtn
                  item={item}
                  onSelect={(value) => handleSelect(item.id, value)}
                />
              )}
              {item.type === "slider" && (
                <SliderBtn
                  item={item}
                  onSelect={(value) => handleSelect(item.id, value)}
                />
              )}
              {item.type === "dropdown" && (
                <DropdownBtn
                  item={item}
                  onSelect={(value) => handleSelect(item.id, value)}
                />
              )}
            </div>
          ))}

          <div className="activities-container-btn-div">
            <button className="activities-container-btn" onClick={handleSubmit}>
              Submit Survey
            </button>
          </div>
        </div>
      ) : (
        // Show this message when the survey is completed
        <ThankYouCard remainingTime={remainingTime} />
      )}
    </div>
  );
};

export default ActivitiesPage;
