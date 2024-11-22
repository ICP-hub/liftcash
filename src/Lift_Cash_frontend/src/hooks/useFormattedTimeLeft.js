import { useState, useEffect } from "react";

const useFormattedTimeLeft = (initialMinutes) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes);

  useEffect(() => {
    setTimeLeft(initialMinutes); // Reset timeLeft whenever initialMinutes changes
  }, [initialMinutes]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 60000); // decrease every 1 minute

    return () => clearInterval(timer); // cleanup on unmount
  }, [timeLeft]);

  const formatTimeLeft = () => {
    if (timeLeft >= 1440) {
      const days = Math.floor(timeLeft / 1440);
      const hours = Math.floor((timeLeft % 1440) / 60);
      return `${days} day${days > 1 ? "s" : ""} ${hours} hr${
        hours !== 1 ? "s" : ""
      }`;
    } else if (timeLeft >= 60) {
      const hours = Math.floor(timeLeft / 60);
      const mins = timeLeft % 60;
      return `${hours} hr${hours !== 1 ? "s" : ""} ${mins} min${
        mins !== 1 ? "s" : ""
      }`;
    }
    return `${timeLeft.toFixed(0)} min${timeLeft !== 1 ? "s" : ""}`;
  };

  return formatTimeLeft();
};

export default useFormattedTimeLeft;
