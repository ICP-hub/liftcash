import "./ClaimAndAssets.css";
import DashBoardHead from "../../components/dashboardHead/DashBoardHead";
import { SlArrowRightCircle } from "react-icons/sl";
import { CiWarning } from "react-icons/ci";

const ClaimAndAssets = () => {
  return (
    <div className="claim-assets-main-div">
      {/* Main content */}
      <DashBoardHead />

      {/* <div className="claim-asstes-first-container">
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

        <div className="claim-asstes-claiming-div">
          <p className="claim-assets-claiming-p">
            Please participate in the voting process to claim.
          </p>
          <a href="#" className="claim-assets-claiming-link">
            For more info on Claiming click here
          </a>
        </div>
      </div> */}

      {/* <div className="claim-asstes-locked-section-main">
        <h2 className="claim-asstes-locked-section-h2">Locked POINTS:</h2>
        <div className="claim-asstes-locked-section-first-div">0</div>

        <button className="claim-asstes-locked-section-btn">Unlock 0%</button>

        <div className="claim-asstes-locked-section-second-div">
          <p>Your POINTS cannot be unlocked.</p>
          <a href="#" className="claim-asstes-locked-section-link">
            For more info click here
          </a>
        </div>
      </div> */}

      <div className="mt-6 pt-6 w-full  max-w-md mx-auto  bg-white rounded-lg  border-2 border-[#00A1ED]">
        <div className="flex px-6 justify-between items-center mb-4 text-center">
          <div>
            <p className=" text-xs text-gray-700">POINT</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div>
            <p className=" text-xs text-gray-600">Mint</p>
            <div className="text-gray-500 hover:text-gray-800 cursor-pointer">
              <SlArrowRightCircle style={{ fontSize: "32px" }} />{" "}
            </div>
          </div>
          <div>
            <p className=" text-xs text-gray-700">FREEOS</p>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
        <div className="flex px-6 justify-between items-center my-4 py-4 text-center">
          <div>
            <p className=" text-xs text-gray-700">FREEBI</p>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        <div className="relative  bg-white rounded-xl   p-4 border-t-2  border-blue-400">
          <button
            disabled
            className="absolute -top-[50px] left-[35%] z-10 text-gray-500 bg-gray-200 rounded-full w-[120px] h-[120px] flex flex-col justify-center items-center"
          >
            <span className="">
            <CiWarning style={{fontSize:"28px", color:"white"}} />
            </span>
            <span className="text-3xl text-white font-bold">CLAIM</span>
            <span className="text-xs font-medium text-white py-1 px-2">Your Freeos POINTS</span>
          </button>
          <div className="flex  justify-between items-center text-center mb-8 mt-4">
            <div className="w-1/2 flex-wrap flex-col items-start flex">
              <p className="text-xs ">Iteration</p>
              <p className="text-xl font-semibold">103</p>
            </div>
            <div className="w-1/3 flex flex-col items-end flex-wrap">
              <p className="text-xs">Next Claim</p>
              <p className="text-xl font-semibold">5days, 18hrs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto mt-6 p-6 pb-8 bg-white rounded-lg border-2 border-[#00A1ED] ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] text-gray-900 font-medium">
            Locked <span className="text-[22px] font-medium"> POINTS</span>:
          </h2>
          <p className="text-[24px] text-gray-900 font-medium">0</p>
        </div>

        <p className="text-xs">
          For more info on Locked POINTS{" "}
          <a href="#" className="text-[#0000EE] underline ">
            click here
          </a>
        </p>

        <div className="border-2 border-[#66C7F4] rounded-lg py-3 px-6 text-center mt-6">
          <p className="text-xl text-[#66C7F4] font-bold">Unlock 0%</p>
        </div>

        <p className="text-xs mt-3 mb-4 text-gray-800">
          Your POINTS cannot be unlocked. For more info{" "}
          <a href="#" className="text-[#8256AA] underline">
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ClaimAndAssets;
