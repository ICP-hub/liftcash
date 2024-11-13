import "./Vote.css";
// import RatifyCard from "../ratify/RatifyCard";
import React, { useEffect, useState } from "react";
import SurveyResult from "../surveyResult/SurveyResult";
// import { useAuthClient } from "../../utils/useAuthClient";
import { voteQuestions } from "../../pages/activitiesPage/constants/Vote";
import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";
import ThankYouCard from "../thankYouCard/ThankYouCard";
import { useSelector } from "react-redux";

const Vote = () => {
  const communityActor = useSelector(
    (state) => state?.actors?.actors?.communityActor
  );

  useEffect(() => {
    console.log("actor on vote page : ", communityActor);
  }, [communityActor]);

  const [percent, setPercent] = useState({});

  const [isVote, setIsVote] = useState(true);
  const [isBackToSurveyResult, setIsBackToSurveyResult] = useState(false);
  const formattedTimeLeft = useFormattedTimeLeft(5);
  const [remainingTime, setRemainingTime] = useState(null);
  const [isRatify, setISRatify] = useState(false);
  const [weeklyVoteResult, setWeeklyVoteResult] = useState([]);

  useEffect(() => {
    // Initialize percent state with default values
    const initialPercent = {};
    voteQuestions.forEach((data) => {
      initialPercent[data.id] = data.slider.default;
    });
    setPercent(initialPercent);
    setRemainingTime(formattedTimeLeft);
  }, []);

  // Handle percentage change for each question
  const handlePercentChange = (id, value) => {
    setPercent((prevPercent) => ({
      ...prevPercent,
      [`${id}`]: value, // Update only the relevant id's value
    }));
  };
  const handleSubmit = async () => {
    if (Object.keys(percent).length < voteQuestions.length) {
      alert("Please complete the Vote before submitting.");
      return;
    }
    console.log("Selected Vote Data:", percent);

    // Integration starts here
    let keys = Object.keys(percent);
    let values = Object.values(percent);

    let voteMap = [];

    for (let i = 0; i < keys.length; i++) {
      let percentageVote = values[i];

      // Special handling for the 5th question (index 4) with small floating-point range

      if (i === 3) {  // Assuming the 5th question is at index 4
        const minSliderValue = 0.0167;
        const maxSliderValue = 0.04;

        // Rescale the slider value (0.0167 to 0.04) into the nat8 range (0 to 255)
        percentageVote =
          ((percentageVote - minSliderValue) /
            (maxSliderValue - minSliderValue)) *
          255;

        // Ensure the value is an integer and clamp it to 0-255 range
        percentageVote = Math.round(percentageVote);
      } else {
        // For other questions, simply round percentageVote to an integer between 0 and 255
        percentageVote = Math.round(percentageVote);
      }

      // Ensure the value is within the nat8 range of 0 to 255
      percentageVote = Math.max(0, Math.min(255, percentageVote));
  
      // console.log("ss : ", percentageVote);
  
      voteMap.push([
        String(keys[i]),
        { PercentageVote: percentageVote }
      ]);

    }

    console.log("voteMap", voteMap);

    // Now submit the voteMap to the communityActor
    await communityActor
      .submit_vote(voteMap)
      .then((response) => {
        console.log("Vote Submitted Successfully:", response);
      })
      .catch((error) => {
        console.error("Error submitting Vote:", error);
      });
    setIsVote(false);
  };

  const sortDataById = (data) => {
    return data.sort((a, b) => {
      // Parse the question ID from the first element and sort numerically
      const idA = parseInt(a[0], 10);  // Convert question ID to a number (e.g., "4" -> 4)
      const idB = parseInt(b[0], 10);  // Convert question ID to a number (e.g., "2" -> 2)

      return idA - idB;  // Sort in ascending order
    });
  };


  // Get weekly Vote result
  const getWeeklyVoteResult = async () => {
    try {
      await communityActor.get_weekly_vote_results()
        .then((response) => {
          // console.log("Weekly Vote Result:", response[response.length-1][1]);
          const sortedData = sortDataById(response[response.length - 1][1]);
          // console.log("Sorted Weekly Vote  :::", sortedData);
          let temp = [];
          for (let i = 0; i < sortedData.length; i++) {
            let scaled = sortedData[i][1].PercentageVote;
            if (i === 3) {
              const minSliderValue = 0.0167;
              const maxSliderValue = 0.04;
              const currentValue = ((scaled / 255) * (maxSliderValue - minSliderValue)) + minSliderValue;
              temp.push(currentValue.toFixed(4))
            }
            else {
              temp.push(scaled);
            }
          };
          // console.log("Temp :::", temp);
          setWeeklyVoteResult(temp);
        })
        .catch((error) => {
          console.error("Error getting Weekly Vote Result:", error);
        });
    } catch (error) {
      console.error("Error getting Weekly Vote Result:", error);
    }
  };

  useEffect(() => {
    getWeeklyVoteResult();
  }, []);
  
  if (isRatify) {
    return <RatifyCard />;
  }
  
  // Conditional rendering
  return isVote && formattedTimeLeft !== "0 mins" ? (
    isBackToSurveyResult ? (
      <SurveyResult />
    ) : (
      <div>
        <div className="vote-main-div">
          <div className="vote-header-div">
            <p
              className="navigate-to-survey-result"
              onClick={() => setIsBackToSurveyResult(true)}
            >
              Back to survey results
            </p>
            <h1 className="vote-title">Welcome to the Vote</h1>
            <p className="vote-sub-title">
              Complete for 70% of your weekly Claim
            </p>
          </div>

          <div className="vote-time-description">
            <p className="vote-remaining-time">
              Vote Closes in: {formattedTimeLeft}
            </p>
            <p className="vote-description">
              Thanks for being active in stewarding this economy. Besides
              empowering your own financial freedom, your answers also affect
              the FREEOS community. For more info{" "}
              <a href="#" className="vote-link">
                click here
              </a>
              .
            </p>

            <h1 className="vote-title bg-blue-200 py-5">
              Ready to Vote? Let's start.
            </h1>
            {voteQuestions.map((data, index) => (
              <div key={data.id}>
                <div className="vote-card-container">
                  <h2 className="vote-card-title ">"{data.title}"</h2>
                  <p className="vote-card-sub-title">
                    {data.issuance.title}: {weeklyVoteResult[index]} {index === 3 ? "USD" : "%"}
                  </p>
                  <p className="vote-card-question">{data.question}</p>
                  <p className="vote-card-question-description">
                    {data.description}
                  </p>

                  {/* Slider Input */}
                  <div className="vote-input-container">
                    <input
                      type="range"
                      step={data.slider.unit === "USD" ? "0.00001" : "1"}
                      min={data.slider.min}
                      max={data.slider.max}
                      value={percent[data.id] || data.slider.default}
                      className="vote-slider"
                      onChange={(event) =>
                        handlePercentChange(data.id, event.target.value)
                      }
                    />
                  </div>
                  <div className="vote-display-percent">
                    <p className="sliderunitfirst">
                      {data.slider.min} {data.slider.unit}
                    </p>
                    <p className="sliderunitsecond">
                      {data.slider.max} {data.slider.unit}
                    </p>
                  </div>
                </div>

                {/* Manual Input */}
                {/* <div
                  className={`vote-manual-input-container ${
                    data.slider.unit === "USD"
                      ? "md:space-x-28"
                      : "md:space-x-32"
                  }`}
                > */}
                <div className="vote-manual-input-container">
                  <p className="vote-manual-input-p">
                    Or manually enter amount:
                  </p>
                  <div className="vote-input-container">
                    <input
                      type="number"
                      step={data.slider.unit === "USD" ? "0.00001" : "1"}
                      className="vote-input"
                      value={percent[data.id] || data.slider.default}
                      min={data.slider.min}
                      max={data.slider.max}
                      onChange={(event) =>
                        handlePercentChange(data.id, event.target.value)
                      }
                    />
                    <span
                      className={`vote-percent-sign ${
                        data.slider.unit !== "USD" ? "pl-5" : " pl-0 "
                      }`}
                    >
                      {data.slider.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="vote-bottom-instruction">
            Almost done- Just check and <br /> 'Submit your Vote'
          </p>
          <div className="vote-btn-div">
            <button className="vote-btn" onClick={handleSubmit}>
              Submit Vote
            </button>
          </div>
        </div>
      </div>
    )
  ) : (
    <ThankYouCard remainingTime={remainingTime} type={"vote"} />
  );
};

export default Vote;
