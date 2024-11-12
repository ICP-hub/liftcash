import React, { useState } from "react";
import HeaderAfterAuth from "../../components/headerAfterAuth/HeaderAfterAuth";
import bgimg from "../../assets/images/background.svg";
import Waveform from "../../components/Waveform";

const AfterAuthPage = ({ children }) => {
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  // Toggle function for background animation
  const onToggleAnimation = () => {
    setIsAnimationActive((prevState) => !prevState);
  };
  return (
    <div>
      <HeaderAfterAuth onToggleAnimation={onToggleAnimation} />
      <div
        style={{
          backgroundImage: isAnimationActive ? "" : `url(${bgimg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
        className=""
      >
        {/* Conditionally render Waveform animation */}
        {isAnimationActive && (
          <div className="absolute  ">
            <Waveform />
          </div>
        )}
        <main className="relative ">{children}</main>
      </div>
    </div>
  );
};

export default AfterAuthPage;
