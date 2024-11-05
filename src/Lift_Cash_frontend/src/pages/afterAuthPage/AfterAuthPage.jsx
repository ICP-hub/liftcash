import React from "react";
import HeaderAfterAuth from "../../components/headerAfterAuth/HeaderAfterAuth";
import bgimg from "../../assets/images/background.svg";

const AfterAuthPage = ({ children }) => {
  return (
    <div className="">
      <HeaderAfterAuth />
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          
        }}
        className=""
      >
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AfterAuthPage;
