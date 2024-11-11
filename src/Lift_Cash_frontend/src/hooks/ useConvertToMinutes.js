import { useMemo } from "react";

// Custom hook to convert time strings like "1 day 2 hr 30 min" to total minutes
const useConvertToMinutes = (remainingTimeString) => {
  return useMemo(() => {
    if (!remainingTimeString) return 0;

    const timeParts = remainingTimeString.toLowerCase().split(" ");
    let totalMinutes = 0;

    for (let i = 0; i < timeParts.length; i += 2) {
      const value = parseInt(timeParts[i], 10);
      const unit = timeParts[i + 1];

      if (unit.startsWith("day")) {
        totalMinutes += value * 24 * 60;
      } else if (unit.startsWith("hr")) {
        totalMinutes += value * 60;
      } else if (unit.startsWith("min")) {
        totalMinutes += value;
      }
    }
    return totalMinutes;
  }, [remainingTimeString]); // Re-compute only when timeString changes
};

export default useConvertToMinutes;
