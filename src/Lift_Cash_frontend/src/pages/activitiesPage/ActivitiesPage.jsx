// import React, { useState, useEffect } from "react";
// import "./ActivitiesPage.css";
// import { useSelector } from "react-redux";
// import PhaseRenderer from "../../components/phaseRenderer /PhaseRenderer";

// const initialPhaseState = {
//   type: null, // e.g., "survey", "vote", "ratify", "survey_result", etc.
//   submitted: false,
//   timeLeft: 0,
// };

// const ActivitiesPage = () => {

//   const [phase, setPhase] = useState(initialPhaseState);

//   const communityActor = useSelector(
//     (state) => state?.actors?.actors?.communityActor
//   );

//   useEffect(() => {
//     getPhaseInfo();
//     console.log("actor on survey page : ", communityActor);
//   }, [communityActor]);

//   useEffect(() => {
//     if (phase.timeLeft > 0) {
//       // Decrement timeLeft every 60 seconds
//       const timer = setInterval(() => {
//         setPhase((prev) => ({
//           ...prev,
//           timeLeft: prev.timeLeft - 1,
//         }));
//       }, 60000); // 60 seconds

//       return () => clearInterval(timer); // Cleanup on unmount
//     } else {
//       handlePhaseTransition(); // Move to the next phase when timeLeft reaches 0
//     }
//   }, [phase.timeLeft]);

//   const handlePhaseTransition = () => {
//     // Logic to fetch the next phase or update state
//     console.log("Transitioning to the next phase...");
//     getPhaseInfo();
//   };

//   function nanoToMin(nano) {
//     const secondsInMinute = 60;
//     const nanoToSeconds = 1e9;
//     const nanoInMinute = nanoToSeconds * secondsInMinute;
//     return nano / nanoInMinute;
//   }

//   const getPhaseInfo = async () => {
//     try {
//       await communityActor
//         .get_current_phase_info()
//         .then((res) => {
//           console.log("Phase Info:", res);
//           const key = Object.keys(res[0]);
//           console.log("phase =>", key[0]);
//           const timeLeft = Math.ceil(nanoToMin(parseInt(res[1])));
//           console.log("Time in Act : ", timeLeft)
//           setPhase({
//             type: key[0],
//             submitted: false,
//             timeLeft: timeLeft,
//           })
//         })
//         .catch((err) => {
//           console.log("Error getting phase info:", err);
//         });
//     } catch (error) {
//       console.error("Error getting phase info:", error);
//     }
//   };

//   const handleSubmission = () => {
//     setPhase((prev) => ({
//       ...prev,
//       submitted: true,
//     }));
//   };

//   const callNextPhase = () => {
//     getPhaseInfo();
//   }

//   return <PhaseRenderer phase={phase} onSubmission={handleSubmission} onTimeUp={callNextPhase} />;
// };

// export default ActivitiesPage;

import React, { useState, useEffect } from "react";
import "./ActivitiesPage.css";
import { useSelector } from "react-redux";
import PhaseRenderer from "../../components/phaseRenderer /PhaseRenderer";

const initialPhaseState = {
  type: null, // e.g., "survey", "vote", "ratify", "survey_result", etc.
  submitted: false,
  timeLeft: 0,
};

const ActivitiesPage = () => {
  const [phase, setPhase] = useState(() => {
    // Initialize phase state from localStorage if available
    const savedPhase = JSON.parse(localStorage.getItem("phaseState"));
    if (savedPhase && savedPhase.timeLeft > 0) {
      return savedPhase;
    }
    return initialPhaseState;
  });

  const communityActor = useSelector(
    (state) => state?.actors?.actors?.communityActor
  );

  useEffect(() => {
    if (!phase.submitted || phase.timeLeft <= 0) {
      getPhaseInfo();
    }
    console.log("Actor on survey page: ", communityActor);
  }, [communityActor]);

  useEffect(() => {
    if (phase.timeLeft > 0) {
      // Decrement timeLeft every 60 seconds
      const timer = setInterval(() => {
        setPhase((prev) => {
          const updatedPhase = { ...prev, timeLeft: prev.timeLeft - 1 };
          localStorage.setItem("phaseState", JSON.stringify(updatedPhase));
          return updatedPhase;
        });
      }, 60000); // 60 seconds

      return () => clearInterval(timer); // Cleanup on unmount
    } else {
      handlePhaseTransition(); // Move to the next phase when timeLeft reaches 0
    }
  }, [phase.timeLeft]);

  const handlePhaseTransition = () => {
    console.log("Transitioning to the next phase...");
    localStorage.removeItem("phaseState");
    getPhaseInfo();
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
          console.log("Time in Act: ", timeLeft);
          const newPhase = {
            type: key[0],
            submitted: false,
            timeLeft: timeLeft,
          };
          setPhase(newPhase);
          localStorage.setItem("phaseState", JSON.stringify(newPhase));
        })
        .catch((err) => {
          console.log("Error getting phase info:", err);
        });
    } catch (error) {
      console.error("Error getting phase info:", error);
    }
  };

  const handleSubmission = () => {
    const updatedPhase = { ...phase, submitted: true };
    setPhase(updatedPhase);
    localStorage.setItem("phaseState", JSON.stringify(updatedPhase));
  };

  const callNextPhase = () => {
    getPhaseInfo();
  };

  return (
    <PhaseRenderer
      phase={phase}
      onSubmission={handleSubmission}
      onTimeUp={callNextPhase}
    />
  );
};

export default ActivitiesPage;
