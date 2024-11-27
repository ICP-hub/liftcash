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

const RatifyCard = ({ formattedTimeLeft: propsFormattedTimeLeft }) => {
  const [vote, setVote] = useState(null);
  // const [isRetifyComplete, setIsRetifyComplete] = useState(false);
  const [isRetifyComplete, setIsRetifyComplete] = useState(
    localStorage.getItem("ratifyCompleted") === "true"
  );

  const [voteResult, setVoteResult] = useState([]);
  const [weeklyVoteResult, setWeeklyVoteResult] = useState([]);

  const [isRatifyVote, setIsRatifyVote] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [timeLeftInMinutes, setTimeLeftInMinutes] = useState(2880); // initial time in minutes
  // const formattedTimeLeft =
  //   propsFormattedTimeLeft ?? useFormattedTimeLeft(timeLeftInMinutes);

  const communityActor = useSelector(
    (currState) => currState?.actors?.actors?.communityActor
  );

  const formattedTimeLeft = useFormattedTimeLeft(timeLeftInMinutes);

  // const PassValue = propsFormattedTimeLeft;

  useEffect(() => {
    console.log("Formated time in Ratify Card ::: ", formattedTimeLeft);
  }, [formattedTimeLeft]);

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
    console.log("actor in ratify card =>", communityActor);
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
    if (formattedTimeLeft === "0 mins") {
      // Remove localStorage when time runs out
      localStorage.removeItem("ratifyCompleted");
      setIsRetifyComplete(false);
    }
  }, [formattedTimeLeft]);

  useEffect(() => {
    if (formattedTimeLeft === "0 mins" && isRetifyComplete) {
      // Remove localStorage when time runs out
      localStorage.removeItem("ratifyCompleted");
      setIsRetifyComplete(false);
    }
  }, [formattedTimeLeft, isRetifyComplete]);

  useEffect(() => {
    getWeekleyResult();
    getVoteResult();
  }, []);

  const handleVote = async (action) => {
    console.log("action: ", action);
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
      setIsSubmitting(false);
      setIsRatifyVote(true);
      localStorage.setItem("ratifyCompleted", "true"); // Set flag in localStorage
      setIsRetifyComplete(true);
      setRemainingTime(formattedTimeLeft);
      toast.success("Submition Successfully");
    } catch (error) {
      console.error("Error submitting vote:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    console.log("Formated time in Ratify Card ::: ", formattedTimeLeft);
  }, [formattedTimeLeft]);

  if (!isRetifyComplete && formattedTimeLeft != "0 mins") {
    return (
      <div className="ratify-main-div">
        <h1 className="ratify-title">Welcome to the Ratify</h1>
        <div className="container-survey-time">
          Survey Closes in:{" "}
          <span className="container-survey-timeleft">{formattedTimeLeft}</span>
        </div>
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

        {/* <p className="ratify-note">{voteData.important_note.text}</p> */}
      </div>
    );
  }
  if (isRetifyComplete && formattedTimeLeft != "0 mins") {
    return <ThankYouCard remainingTime={formattedTimeLeft} type="retify" />;
  }
  if (!isRetifyComplete && formattedTimeLeft === "0 mins") {
    return <RatifyResult />;
  }
  // if (isRetifyComplete && formattedTimeLeft === "0 mins") {
  //   return <RatifyResult />;
  // }
  if (formattedTimeLeft === "0 mins") {
    return <RatifyResult />;
  }
};

export default RatifyCard;
