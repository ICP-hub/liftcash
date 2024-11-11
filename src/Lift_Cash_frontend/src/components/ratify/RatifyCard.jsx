import React, { useState } from "react";
import "./Ratifycard.css";
import { voteData } from "../../pages/activitiesPage/constants/Ratify";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import RatifyResult from "../ratifyResult/RatifyResult";
import { useSelector } from "react-redux";

const RatifyCard = () => {
  const [vote, setVote] = useState(null);
  const [isRetifyResult, setIsRetifyResult] = useState(false);
  const communityActor = useSelector(
    (currState) => currState?.actors?.actors?.communityActor
  );
  console.log("actor in ratify card =>", communityActor);

  const handleVote = async (action) => {
    console.log("action: ", action);

    const passData = action === "agree";

    if (!communityActor || !communityActor.submit_ratification) {
      console.error(
        "submit_ratification method not found on communityActor object."
      );
      return;
    }
    console.log("passData ->", passData);
    try {
      const result = await communityActor.submit_ratification(passData);
      console.log("result =>", result);
      setVote(action);
      setIsRetifyResult(true);
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return !isRetifyResult ? (
    <div className="ratify-main-div">
      <h1 className="ratify-title">Welcome to the Ratify</h1>

      {voteData.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="ratify-vote-title">{section.title}</h2>
          {section.details.map((detail, index) => (
            <div
              key={index}
              className={
                index % 2 === 0
                  ? "ratify-vote-lable-even"
                  : "ratify-vote-lable-odd"
              }
            >
              <p className="">
                {detail.label}:{" "}
                <span className="ratify-vote-value">{detail.value}</span>
              </p>
              {detail.change === "down" && (
                <span className="ratify-indicator">
                  <FaArrowDown />
                </span>
              )}
              {detail.change === "up" && (
                <span className="ratify-indicator">
                  <FaArrowUp />
                </span>
              )}
            </div>
          ))}
        </div>
      ))}

      <h2 className="ratify-vote-question-title">{voteData.vote.question}</h2>

      <div className="ratify-vote-btn-container">
        {voteData.vote.options.map((option, index) => (
          <button
            key={index}
            className=" ratify-vote-btn"
            onClick={() => handleVote(option.action)}
          >
            {option.text}
          </button>
        ))}
      </div>

      {/* <p className="ratify-note">{voteData.important_note.text}</p> */}
    </div>
  ) : (
    <RatifyResult />
  );
};

export default RatifyCard;
