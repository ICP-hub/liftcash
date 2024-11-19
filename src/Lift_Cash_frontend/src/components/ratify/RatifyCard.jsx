import React, { useEffect, useState } from "react";
import "./Ratifycard.css";
import { voteData } from "../../pages/activitiesPage/constants/Ratify";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import RatifyResult from "../ratifyResult/RatifyResult";
import { useSelector } from "react-redux";

import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";
import ThankYouCard from "../thankYouCard/ThankYouCard";

import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";


const RatifyCard = () => {
  const [vote, setVote] = useState(null);
  const [isRetifyResult, setIsRetifyResult] = useState(false);
  const [voteResult, setVoteResult] = useState([]);
  const [weeklyVoteResult, setWeeklyVoteResult] = useState([]);

  const formattedTimeLeft = useFormattedTimeLeft(1);
  const [isRatifyVote, setIsRatifyVote] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);


  const communityActor = useSelector(
    (currState) => currState?.actors?.actors?.communityActor
  );

  useEffect(() => {
    console.log("actor in ratify card =>", communityActor);

    setRemainingTime(formattedTimeLeft);

  }, [communityActor]);

  const sortDataById = (data) => {
    return data.sort((a, b) => {
      const idA = parseInt(a[0]);
      const idB = parseInt(b[0]);
      return idA - idB;
    });
  };

  const getVoteResult = async () => {
    try {
      await communityActor
        .get_average_votes()
        .then((response) => {
          // console.log("Vote Result: ", response);
          const sortedVoteResult = sortDataById(response);
          // console.log("Sorted Vote Result: ", sortedVoteResult[0][1].PercentageVote);
          let temp = [];
          for (let i = 0; i < sortedVoteResult.length; i++) {
            if (i === 3) {
              const minSliderValue = 0.0167;
              const maxSliderValue = 0.04;

              const currentValue =
                (sortedVoteResult[i][1].PercentageVote / 255) *
                  (maxSliderValue - minSliderValue) +
                minSliderValue;

              temp.push(currentValue);
            } else {
              temp.push(sortedVoteResult[i][1].PercentageVote);
            }
          }
          console.log("finalResults :", temp);
          setVoteResult(temp);
        })
        .catch((error) => {
          console.error("Error while fetching vote result : ", error);
        });
    } catch (error) {
      console.error("Error fetching vote result : ", error);
    }
  };

  const getWeekleyResult = async () => {
    try {
      await communityActor
        .get_weekly_vote_results()
        .then((response) => {
          console.log("Weekly Vote Result: ", response);
          const sortedWeeklyResult = sortDataById(response);
          console.log(
            "Sorted Weekly Vote Result: ",
            sortDataById(sortedWeeklyResult[sortedWeeklyResult.length - 1][1])
          );
          const finalResult = sortDataById(
            sortedWeeklyResult[sortedWeeklyResult.length - 1][1]
          );
          // console.log("Final Weekly Vote Result: ", finalResult);

          let temp = [];

          for (let i = 0; i < finalResult.length; i++) {
            temp.push(finalResult[i][1].PercentageVote);
          }

          // console.log("finalResults :", temp);

          setWeeklyVoteResult(temp);
        })
        .catch((error) => {
          console.error("Error while fetching weekly result : ", error);
        });
    } catch (error) {
      console.error("Error fetching weekly result : ", error);
    }
  };

  useEffect(() => {
    getWeekleyResult();
    getVoteResult();
  }, []);

  const handleVote = async (action) => {
    console.log("action: ", action);

    setIsRatifyVote(true);
    setIsSubmitting(true);


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
      setIsSubmitting(false);
      toast.success("Submition Successfully");
    } catch (error) {
      console.error("Error submitting vote:", error);
      toast.error("Something went wrong");
    }
  };


  return !isRetifyResult && formattedTimeLeft !== "0 mins" ? (
    isRatifyVote ? (
      <ThankYouCard remainingTime={remainingTime} type="retify" />
    ) : (
      <div className="ratify-main-div">
        <h1 className="ratify-title">Welcome to the Ratify</h1>

        {voteData?.questions?.map((item, index) => (
          <div key={index} className="mb-6">
            <h2 className="ratify-vote-title">{item.question}</h2>
            <div className="ratify-vote-lable-even">
              <p className="">
                {item.label1} :{" "}
                <span className="ratify-vote-value">
                  {weeklyVoteResult[index]}%
                </span>
              </p>
              {/* <span className="ratify-indicator">
              <FaArrowDown />
            </span> */}
            </div>
            <div className="ratify-vote-lable-odd">
              <p className="">
                {item.label2}:{" "}
                <span className="ratify-vote-value">{voteResult[index]}%</span>
              </p>
              <span className="ratify-indicator">
                <FaArrowUp color="green" />
              </span>
            </div>
          </div>
        ))}
=======
  return !isRetifyResult ? (
    <div className="ratify-main-div">
      <h1 className="ratify-title">Welcome to the Ratify</h1>

      {voteData?.questions?.map((item, index) => (
        <div key={index} className="mb-6">
          <h2 className="ratify-vote-title">{item.question}</h2>
          <div className="ratify-vote-lable-even">
            <p className="">
              {item.label1} :{" "}
              <span className="ratify-vote-value">
                {weeklyVoteResult[index]}%
              </span>
            </p>
            {/* <span className="ratify-indicator">
              <FaArrowDown />
            </span> */}
          </div>
          <div className="ratify-vote-lable-odd">
            <p className="">
              {item.label2}:{" "}
              <span className="ratify-vote-value">{voteResult[index]}%</span>
            </p>
            <span className="ratify-indicator">
              <FaArrowUp color="green" />
            </span>
          </div>
        </div>
      ))}

      <h2 className="ratify-vote-question-title">{voteData.vote.question}</h2>

      <div className="ratify-vote-btn-container">
        {!isSubmitting ? (
          voteData.vote.options.map((option, index) => (
            <button
              key={index}
              className="ratify-vote-btn"
              onClick={() => handleVote(option.action)}
            >
              {option.text}
            </button>
          ))
        ) : (
          <button
            disabled={isSubmitting}
            className="ratify-vote-btn w-[80%] flex justify-center"
          >
            <ThreeDots
              visible={true}
              height="30"
              width="40"
              color="white"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </button>
        )}
      </div>
>>>>>>> Stashed changes

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
    )
  ) : (
    <RatifyResult />
  );
};

export default RatifyCard;
