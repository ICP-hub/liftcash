import { IoIosArrowRoundDown } from "react-icons/io";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import "./DashBoardHead.css";

const DashBoardHead = () => {
  return (
    <>
      <div className="claim-assets-logo ">
        {/* logo */}
        <HiOutlineCurrencyRupee />
      </div>
      <div className="claim-assets-tagline">
        <p>Weekly Lift Cash price xUSDC $000.456 </p>
        <span className="claim-assets-tagline-icon">
          <IoIosArrowRoundDown />
        </span>
      </div>
    </>
  );
};

export default DashBoardHead;
