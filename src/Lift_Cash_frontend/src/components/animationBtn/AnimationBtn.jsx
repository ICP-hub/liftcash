import { useState } from "react";
import "./AnimationBtn.css"; // Import the CSS file

const AnimationBtn = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="container">
      {/* Slider Button */}
      <div
        className={`slider-container ${isEnabled ? "enabled" : "disabled"}`}
        onClick={toggleSwitch}
      >
        <div className={`bgcolor ${
            isEnabled ? "bgknob-enabled" : "bgknob-disabled"
          }`}>
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
