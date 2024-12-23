import "./ClaimAndAssets.css";
import DashBoardHead from "../../components/dashboardHead/DashBoardHead";
import { RiLoginCircleLine } from "react-icons/ri";
import { CiWarning } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router-dom";
import bgimg from "../../assets/images/background.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFormattedTimeLeft from "../../hooks/useFormattedTimeLeft";
import CongratsModal from "../../components/CongratsCard/CongratsModal";

const ClaimAndAssets = () => {
  const navigate = useNavigate();
  const [userRecord, setUserRecord] = useState({
    total_promo: 0.0,
    locked_promo: 0.0,
    unlocked_promo: 0.0,
    burn_history: [],
    lift_token_balance: 0.0,
    last_week_reward: 0.0,
    icp_balance: 0.0,
  });

  const [isOpen, setIsOpen] = useState(true);

  const [weekCount, setWeekCount] = useState(0);

  const [timeLeft, setTimeLeft] = useState(0);

  const formattedTimeLeft = useFormattedTimeLeft(timeLeft);

  const economyActor = useSelector(
    (state) => state?.actors?.actors?.economyActor
  );
  const communityActor = useSelector(
    (state) => state?.actors?.actors?.communityActor
  );

  useEffect(() => {
    console.log("actor on Claim Page : ", economyActor);
    console.log("actor on survey page : ", communityActor);
    fetchUserRecords();
    fetchWeekCount();
    getPhaseInfo();
  }, [economyActor, communityActor]);

  useEffect(() => {
    console.log("UR : ", userRecord);
  }, [userRecord]);

  const fetchUserRecords = async () => {
    try {
      await economyActor
        .fetch_user_record()
        .then((res) => {
          console.log("User Records:", res);
          setUserRecord(res);
        })
        .catch((error) => {
          console.log("Error fetching user records: ", error);
        });
    } catch (error) {
      console.log("Error fetching user records: ", error);
    }
  };

  const fetchWeekCount = async () => {
    try {
      await communityActor
        .get_week_count()
        .then((res) => {
          console.log("Week Count:", res);
          setWeekCount(parseInt(res));
        })
        .catch((error) => {
          console.log("Error fetching week count: ", error);
        });
    } catch (error) {
      console.log("Error fetching week count: ", error);
    }
  };

  function nanoToMin(nano) {
    const secondsInMinute = 60;
    const nanoToSeconds = 1e9;
    const nanoInMinute = nanoToSeconds * secondsInMinute;
    return nano / nanoInMinute;
  }

  const getPhaseInfo = async () => {
    try {
      await communityActor
        .get_current_phase_info()
        .then((res) => {
          console.log("Phase Info:", res);
          const key = Object.keys(res[0]);
          console.log("phase =>", key[0]);
          const timeLeft = Math.ceil(nanoToMin(parseInt(res[1])));
          console.log("Time in Act : ", timeLeft);
          // 2d 2880
          // 8h 480
          if (key[0] === "Survey") {
            let totalTime = timeLeft + 480 + 2880 + 2880 + 480;
            setTimeLeft(totalTime);
          }
          if (key[0] === "SurveyResults") {
            let totalTime = timeLeft + 2880 + 2880 + 480;
            setTimeLeft(totalTime);
          }
          if (key[0] === "Vote") {
            let totalTime = timeLeft + 2880 + 480;
            setTimeLeft(totalTime);
          }
          if (key[0] === "Ratify") {
            let totalTime = timeLeft + 480;
            setTimeLeft(totalTime);
          }
          if (key[0] === "RatifResults") {
            setTimeLeft(timeLeft);
          }
        })
        .catch((err) => {
          console.log("Error getting phase info:", err);
        });
    } catch (error) {
      console.error("Error getting phase info:", error);
    }
  };
  if (isOpen)
    return (
      <CongratsModal
        reward={userRecord.last_week_reward || 0}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    );

  return (
    <div className="claim-assets-container ">
      <DashBoardHead />

      <div className="card-container">
        <div className="asset-row">
          <div>
            <p className="asset-label">PROMO</p>
            <p className="asset-amount">{userRecord.unlocked_promo}</p>
          </div>

          <div>
            <p className="asset-label">LIFT</p>
            <p className="asset-amount">{userRecord.lift_token_balance}</p>
          </div>
        </div>
        {/* <div className="asset-row my-4 py-4">
          <div>
            <p className="asset-label">FREEBI</p>
            <p className="asset-amount">0</p>
          </div>
        </div> */}

        <div className="claim-box">
          {/* {formattedTimeLeft === "0 mins" ? ( */}
          <button
            onClick={() => navigate("/mint")}
            className="enabled-claim-button"
          >
            <RiLoginCircleLine style={{ fontSize: "32px" }} />{" "}
            {/* <span className="claim-text">MINT</span> */}
            {/* <span className="small-description">Your PROMO</span> */}
          </button>
          {/* ) : (
            <button className="disabled-claim-button">
              <span>
                <CiWarning style={{ fontSize: "28px", color: "white" }} />
              </span>
              <span className="claim-text">CLAIM</span>
              <span className="small-description">Your PROMO</span>
            </button>
          )} */}

          <div className="flex justify-between items-center text-center mb-8 mt-4">
            <div className="w-1/2 flex-wrap flex-col items-start flex">
              <p className="text-xs">Iteration</p>
              <p className="text-xl font-semibold">{weekCount}</p>
            </div>
            <div className="w-1/3 flex flex-col items-end flex-wrap">
              <p className="text-xs">Next Claim</p>
              <p className="text-lg font-semibold">{formattedTimeLeft}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="locked-section">
        <div className="flex justify-between items-center mb-4">
          <h2 className="locked-header">
            Locked <span>PROMO</span> :
          </h2>
          <p className="text-xl text-dark-grey font-semibold">
            {userRecord.locked_promo}
          </p>
        </div>

        <p className="text-xs flex flex-row gap-2">
          For more info on Locked PROMO{" "}
          <p
            className="text-blue-violet underline"
            onClick={() => window.open("/", "_blank")}
          >
            click here
          </p>
        </p>

        <div className="unlock-info">
          <button className="unlock-percentage">Unlock 0%</button>
        </div>

        <p className="info-text flex flex-row gap-2">
          Your PROMO cannot be unlocked. For more info{" "}
          <p
            className="text-blue-violet underline"
            onClick={() => window.open("/claim", "_blank")}
          >
            click here
          </p>
        </p>
      </div>
    </div>
  );
};

export default ClaimAndAssets;
