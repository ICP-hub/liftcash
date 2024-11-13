import { useState } from "react";
import "./AnimationBtn.css";

const AnimationBtn = ({ onToggleAnimation }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onToggleAnimation(); // Call parent function to toggle animation
  };

  return (
    <div className="container">
      <div
        className={`slider-container ${isEnabled ? "enabled" : "disabled"}`}
        onClick={toggleSwitch}
      >
        <div className={`${isEnabled ? "bgknob-enabled" : "bgknob-disabled"}`}>
          <div
            className={`slider-knob ${
              isEnabled ? "knob-enabled" : "knob-disabled"
            }`}
          ></div>
        </div>
      </div>
      <p className="text-sm">
        {isEnabled ? "Disable Animation" : "Enable Animation"}
      </p>
    </div>
  );
};

export default AnimationBtn;
