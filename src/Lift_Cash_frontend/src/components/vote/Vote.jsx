import React, { useEffect, useState } from "react";
import "./Vote.css";

const Vote = () => {
  const [percent, setPercent] = useState(50);
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 10,
  });

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes } = prevTime;

        if (minutes > 0) {
          minutes -= 1;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
        }

        return { hours, minutes };
      });
    }, 60000); // Update every 60 seconds (1 minute)

    return () => clearInterval(countdownInterval); // Clear interval on unmount
  }, []);
  return (
    <div>
      <div className="vote-main-div">
        <div className="vote-header-div">
          <p className="navigate-to-survey-result">Back to survey results</p>
          <h1 className="vote-title">Welcome to the Vote</h1>
          <p className="vote-sub-title">
            Complete for 50% of your weekly Claim
          </p>
        </div>

        <div className="vote-time-description">
          <p className="vote-remaining-time">
            Vote Closes in: {timeLeft.hours}hrs,
            {timeLeft.minutes}mins
          </p>
          <p className="vote-description">
            Thanks for being active in stewarding this economy. Besides
            empowering your own financial freedom, your answers also affect the
            FREEOS community. For more info{" "}
            <a href="#" className="vote-link">
              click here
            </a>
            .
          </p>

          <h1 className="vote-title bg-blue-200 py-5">
            Ready to Vote? Let's start.
          </h1>

          <div className="vote-card-container">
            <h2 className="vote-card-title ">Issuance</h2>
            <p className="vote-card-sub-title">Last week's Issuance: 81%</p>
            <p className="vote-card-question">
              What percentage of the issuance should be minted this week?
            </p>
            <p className="vote-card-question-description">
              Do you feel the Bitcoin (BTC) and wider crypto market is growing
              (bull market), shrinking (bear market), or neither (going
              sideways)?
            </p>

            {/* Example input with a slider or dropdown */}
            <div className="vote-input-container">
              <input
                type="range"
                min="0"
                max="100"
                className="vote-slider "
                onChange={(event) => setPercent(event.target.value)}
              />
            </div>
            <div className="vote-display-percent">
              <p>0%</p>
              <p>100%</p>
            </div>
          </div>
          <div className="vote-manual-input-container ">
            <p className="vote-manual-input-p">Or manually enter amount:</p>
            <div className="vote-input-container">
              <input
                type="number"
                className="vote-input"
                value={percent}
                min="0"
                max="100"
                onChange={(event) => setPercent(event.target.value)}
              />
              <span className="vote-percent-sign"> %</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
