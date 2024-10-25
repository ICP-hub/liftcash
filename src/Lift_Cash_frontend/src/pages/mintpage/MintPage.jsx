import React, { useState } from "react";
import DashBoardHead from "../../components/dashboardHead/DashBoardHead";
import MintTransaction from "../../components/mintTransaction/MintTransaction";

const MintPage = () => {
  const [activeTab, setActiveTab] = useState("FREEOS");

  return (
    <div className="min-h-screen bg-gradient-to-b pb-8 from-blue-200 to-blue-500  flex flex-col items-center">
      <DashBoardHead />
      <div className="mt-6 pt-2 w-full  max-w-md mx-auto  bg-white rounded-lg  border-2 border-[#00A1ED] ">
        <h1 className="text-3xl font-semibold p-4 text-[#222222] mb-4 text-center">
          Mint
        </h1>

        <div className="flex justify-around px-6 ">
          <button
            onClick={() => setActiveTab("FREEOS")}
            className={`w-full py-2 text-xl font-medium rounded-t-md border ${
              activeTab === "FREEOS"
                ? " bg-[#CCCCCC] border-blue-500 border-b-0 border-r-0 mt-3 text-gray-800"
                : "text-black py-4 border-2 border-b-0 border-blue-500"
            }`}
          >
            Mint FREEOS
          </button>
          <button
            onClick={() => setActiveTab("FREEBI")}
            className={`w-full py-2 text-xl font-medium rounded-t-md border ${
              activeTab === "FREEBI"
                ? " bg-[#CCCCCC] border-blue-500 border-b-0 border-l-0 mt-3 text-gray-800"
                : "text-black py-4 border-2 border-b-0 border-blue-500"
            }`}
          >
            Mint FREEBI
          </button>
        </div>
        <div className="h-px bg-black "></div>
        {activeTab === "FREEOS" ? (
          <div className="bg-[#00A1ED] text-white text-[16px]  font-medium py-4 flex justify-center items-center">
            <p className="text-xl text-center font-semibold">
              This could be a taxable event in your jurisdiction
            </p>
          </div>
        ) : (
          <div className="bg-[#00A1ED] text-white text-[16px]  font-medium py-4 flex justify-center items-center">
            <p className="text-xl text-center font-semibold">
              Mint <span className="text-[22px] ">POINTS</span> to{" "}
              <span className="text-[22px] ">FREEBI</span>
            </p>
          </div>
        )}

        {/* Mint Fee Information */}
        <p className="text-sm text-gray-800 p-6">
          The Mint Fee applies when you mint your ‘Claimed POINTS’ or FREEBI
          into a tradable token (FREEOS). For more info{" "}
          <a href="#" className="text-[#0000EE] underline">
            click here
          </a>
          .
        </p>

        {/* Balances */}
        <div className="bg-white border mx-4 my-2 border-blue-400 rounded-lg p-2 mb-4">
          <h2 className="text-base text-center text-[#00A1ED] font-medium mb-2">
            Your Current balances:
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#DAECFA] flex flex-col justify-center items-center rounded-md text-sm text-[#00A1ED] py-1 font-medium">
              <p className="text-lg text-gray-800">0</p>
              <p>POINT</p>
            </div>
            <div className="bg-[#DAECFA] flex flex-col justify-center items-center rounded-md text-sm text-[#00A1ED] py-1 font-medium">
              <p className="text-lg text-gray-800">0</p>
              <p>FREEBI</p>
            </div>
            <div className="bg-[#DAECFA] flex flex-col justify-center items-center rounded-md text-sm text-[#00A1ED] py-1 font-medium">
              <p className="text-lg text-gray-800">0</p>
              <p>FREEOS</p>
            </div>
            <div className="bg-[#DAECFA] flex flex-col justify-center items-center rounded-md text-sm text-[#00A1ED] py-1 font-medium">
              <p className="text-lg text-gray-800">0</p>
              <p>XPR</p>
            </div>
          </div>
        </div>

        {/* Mint Fee Details */}
        <div className="bg-white border m-6 border-blue-400 rounded-lg ">
          <h3 className="text-base font-medium text-center text-[#00A1ED] pt-2 pb-1">
            Mint Fee Details:
          </h3>
          <p className="text-sm text-center font-medium text-gray-800 mb-2">
            FREEOS = 9.0588% | XPR = 13.8529% | XUSDC = 14.0441%
          </p>
          <div className="bg-[#DAECFA] text-center py-2 rounded-b-lg">
            <p className="text-sm  text-blue-500 font-bold mb-2">
              Minimum Mint Fee
            </p>
            <p className="text-sm font-semibold text-gray-900">
              3000 FREEOS
              <br />
              or 4139.5982 XPR
              <br />
              or 10.20099 XUSDC
            </p>
          </div>
        </div>
        {/* Mint Transaction */}

        {/* <>
          <MintTransaction />
        </> */}
      </div>
    </div>
  );
};

export default MintPage;
