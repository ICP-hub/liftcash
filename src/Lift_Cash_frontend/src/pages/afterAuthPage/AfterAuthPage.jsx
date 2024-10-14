import React from "react";
import HeaderAfterAuth from "../../components/headerAfterAuth/HeaderAfterAuth";

const AfterAuthPage = ({ children }) => {
  return (
    <div>
      <HeaderAfterAuth />
      <main>{children}</main>
    </div>
  );
};

export default AfterAuthPage;
