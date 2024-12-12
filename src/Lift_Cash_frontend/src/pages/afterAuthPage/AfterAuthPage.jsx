import React, { useState } from "react";
import HeaderAfterAuth from "../../components/headerAfterAuth/HeaderAfterAuth";
import bgimg from "../../assets/images/background.svg";
// import Waveform from "../../components/threejs/Waveform";
import FloatingDustWave from "../../components/threejs/FloatingDustWave";
import { useAuthClient } from "../../utils/useAuthClient";
import AccessDenied from "../accessDeniedPage/AccessDenied";

const AfterAuthPage = ({ children }) => {
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  // Toggle function for background animation
  const onToggleAnimation = () => {
    setIsAnimationActive((prevState) => !prevState);
  };

  const { isAuthenticated } = useAuthClient();

  console.log("isAuth in AfterAuthPage : ", isAuthenticated);

  if(isAuthenticated){
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
              {/* <Waveform /> */}
              <FloatingDustWave />
            </div>
          )}
          <main className="relative ">{children}</main>
        </div>
      </div>
    );
  }
  else{
    return <AccessDenied />
  }
  
};

export default AfterAuthPage;
