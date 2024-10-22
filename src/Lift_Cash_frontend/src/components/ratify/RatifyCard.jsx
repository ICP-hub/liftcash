import React, { useState } from "react";
import "./RatifyCard.css";
import { voteData } from "../../pages/activitiesPage/constants/Ratify";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const RatifyCard = () => {
  const [vote, setVote] = useState(null);

  const handleVote = (action) => {
    setVote(action);
    console.log(`You voted: ${action === "agree" ? "Yes" : "No"}`);
  };

  return (
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

      <p className="ratify-note">{voteData.important_note.text}</p>
    </div>
  );
};

export default RatifyCard;
