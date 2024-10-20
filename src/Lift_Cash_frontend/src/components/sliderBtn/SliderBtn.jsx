import React, { useEffect, useState } from "react";
import "./SliderBtn.css";

const SliderBtn = ({ item, onSelect }) => {
  const [months, setMonths] = useState(item.range.current); // Default slider value is 12 months

  const handleSliderChange = (event) => {
    setMonths(event.target.value);
  };
  // Debouncing the months value change
  useEffect(() => {
    const timer = setTimeout(() => {
      onSelect(months);
    }, 300); // Wait for 300ms before sending the value to parent

    // Cleanup the timer if the component is unmounted or value changes
    return () => clearTimeout(timer);
  }, [months, onSelect]);

  return (
    <div className="slider-main-div">
      <input
        type="range"
        min={item.range.min}
        max={item.range.max}
        value={months}
        onChange={handleSliderChange}
        className="slider"
      />
      <div className="container-silder-months">
        <span>{item.range.min} month</span>
        <span>{item.range.max} months</span>
      </div>

      <div className="text-center ">
        <span className="slider-months-show">{months} months</span>
      </div>
    </div>
  );
};

export default SliderBtn;
