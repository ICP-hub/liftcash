import { IoIosArrowRoundDown } from "react-icons/io";
import logo from "../../assets/images/logo.png";

import "./DashBoardHead.css";

const DashBoardHead = () => {
  return (
    <>
      <div className="claim-assets-logo ">
        {/* logo */}
        <img src={logo} alt="" />
      </div>
      <div className="claim-assets-tagline">
        <p>Weekly Lift Cash price $000.456 </p>
        <span className="claim-assets-tagline-icon">
          <IoIosArrowRoundDown />
        </span>
      </div>
    </>
  );
};

export default DashBoardHead;
