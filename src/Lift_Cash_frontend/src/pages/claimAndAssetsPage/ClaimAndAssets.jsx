import { IoIosArrowRoundDown } from "react-icons/io";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import "./ClaimAndAssets.css";
const ClaimAndAssets = () => {
  return (
    <div className="claim-assets-main-div">
      {/* Main content */}
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

      <div className="claim-asstes-first-container">
        {/* PROMO and LIFT */}
        <div className="claim-asstes-first-container-inside">
          <div>
            <h2 className="claim-asstes-first-container-h2">PROMO</h2>
            <div className="claim-asstes-first-container-div">0</div>
          </div>

          <div>
            <h2 className="claim-asstes-first-container-h2">LIFT CASH</h2>
            <div className="claim-asstes-first-container-div">0</div>
          </div>
          <div>
            <h2 className="claim-asstes-first-container-h2">FREEBI</h2>
            <div className="claim-asstes-first-container-div">0</div>
          </div>
        </div>

        {/* PROMO and Iteration */}

        {/* Claim and Iteration Info */}
        <div className="claim-assets-Iteration-info">
          <h2 className="claim-assets-Iteration-info-h2">Iteration</h2>
          <div className="claim-assets-Iteration-value">102</div>
          <button className="claim-assets-Iteration-btn" disabled>
            <span className="claim-assets-Iteration-text">
              CLAIM Your Lift Cash POINTS
            </span>
          </button>
          <div className="text-gray-500 mt-4">
            <p>Next Claim</p>
            <p className="claim-asstes-Iteration-p2">6 days, 13 hrs</p>
          </div>
        </div>

        {/* Claiming Info */}
        <div className="claim-asstes-claiming-div">
          <p className="claim-assets-claiming-p">
            Please participate in the voting process to claim.
          </p>
          <a href="#" className="claim-assets-claiming-link">
            For more info on Claiming click here
          </a>
        </div>
      </div>

      {/* Locked Points Section */}
      <div className="claim-asstes-locked-section-main">
        <h2 className="claim-asstes-locked-section-h2">Locked POINTS:</h2>
        <div className="claim-asstes-locked-section-first-div">0</div>

        <button className="claim-asstes-locked-section-btn">Unlock 0%</button>

        <div className="claim-asstes-locked-section-second-div">
          <p>Your POINTS cannot be unlocked.</p>
          <a href="#" className="claim-asstes-locked-section-link">
            For more info click here
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClaimAndAssets;
