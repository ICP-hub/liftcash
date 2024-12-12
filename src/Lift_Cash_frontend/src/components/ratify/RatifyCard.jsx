import React, { useEffect, useState } from "react";
import "./Ratifycard.css";
import { voteData } from "../../pages/activitiesPage/constants/Ratify";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";

import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";

import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const RatifyCard = ({ timeLeft, onSubmit, onTimeUp }) => {
  const communityActor = useSelector(
    (currState) => currState?.actors?.actors?.communityActor
  );

  const formattedTimeLeft = useFormattedTimeLeft(timeLeft);

  const[isParticipated, setIsParticipated] = useState(false);

  // const PassValue = propsFormattedTimeLeft;

  const fetchUserParticipation = async () => {
    try {
      await communityActor
        .chck_userparticipation_vote()
        .then((res) => {
          console.log("response for user participation", res);
          if (res === "No") {
            setIsParticipated(false);
          } else {
            setIsParticipated(true);
          }
        })
        .catch((err) => {
          console.log("somethig wrong with the user participation", err);
        });
    } catch (err) {
      console.log("somethig wrong with the user participation", err);
    }
  };

  // useEffect(() => {
  //   fetchUserParticipation();
  // }, []);

  useEffect(() => {
    console.log("Formated time in Ratify Card ::: ", formattedTimeLeft);
    if (formattedTimeLeft === "0 mins") {
      onTimeUp();
    }
  }, [formattedTimeLeft]);

  const [voteResult, setVoteResult] = useState([]);
  const [weeklyVoteResult, setWeeklyVoteResult] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          console.log("Vote Result: ", response);
          const sortedVoteResult = sortDataById(response);
          console.log("Sorted Vote Result: ", sortedVoteResult[0][1].PercentageVote);
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
            if (i === 3) {
              const minSliderValue = 0.0167;
              const maxSliderValue = 0.04;

              const currentValue =
                (finalResult[i][1].PercentageVote / 255) *
                  (maxSliderValue - minSliderValue) +
                minSliderValue;

              temp.push(currentValue);
            } else {
              temp.push(finalResult[i][1].PercentageVote);
            }
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
    fetchUserParticipation();
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
      setIsSubmitting(false);
      onSubmit();
      toast.success("Submition Successfully");
    } catch (error) {
      console.error("Error submitting vote:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="ratify-main-div">
      <h1 className="ratify-title">Welcome to the Ratify</h1>
      <div className="container-survey-time">
        Time Left:{" "}
        <span className="container-survey-timeleft">{formattedTimeLeft}</span>
      </div>
      {voteData?.questions?.map((item, index) => (
        <div key={index} className="mb-6">
          <h2 className="ratify-vote-title">{item.question}</h2>
          <div className="ratify-vote-lable-even">
            <p className="">
              {item.label1} :{" "}
              <span className="ratify-vote-value">
                {index === 3
                  ? `${Number(weeklyVoteResult[index]).toFixed(4)} USD`
                  : `${weeklyVoteResult[index]} %`}{" "}
                {/* {weeklyVoteResult[index]}% */}
              </span>
            </p>
            {/* <span className="ratify-indicator">
          <FaArrowDown />
        </span> */}
          </div>
          <div className="ratify-vote-lable-odd">
            <p className="">
              {item.label2}:{" "}
              <span className="ratify-vote-value">
                {index === 3
                  ? `${Number(voteResult[index]).toFixed(4)} USD`
                  : `${voteResult[index]} %`}{" "}
              </span>
            </p>
            <span className="ratify-indicator">
              <FaArrowUp color="green" />
            </span>
          </div>
        </div>
      ))}
      {isParticipated === true ? (
        <>
          <h2 className="ratify-vote-question-title">
            {voteData.vote.question}
          </h2>

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
        </>
      ) : (
        <div className="messageContainer">
          <p className="textmessage ">
            You are not eligible for the Ratification Process
          </p>
          <p className="textmessage ">
            As you haven't participated in the Voting Process.
          </p>
        </div>
      )}

      {/* <p className="ratify-note">{voteData.important_note.text}</p> */}
    </div>
  );
};

export default RatifyCard;
