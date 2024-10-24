import "./TransferPage.css";
import DashBoardHead from "../../components/dashboardHead/DashBoardHead";
import React, { useState } from "react";

const Transferpage = () => {
  const [activeTab, setActiveTab] = useState("FREEOS");
  return (
    <div className="transfer-main-section">
      <DashBoardHead />
      {/* <div className="transfer-balance-card-section-main ">
        <p className="transfer-balance-card-section-amount">
          Your current balances: $ 34
        </p>
        <div className="transfer-balance-card-section-tokens">
          <div className="transfer-balance-card-section-present-tokens">
            0 LIFT CASH
          </div>
          <div className="transfer-balance-card-section-present-tokens">
            0 PROMO
          </div>
        </div>

        <div className="transfer-balance-card-send-section-main">
          <button className="transfer-balance-card-send-section-btn">
            Send LIFT CASH
          </button>
          <button className="transfer-balance-card-send-section-btn">
            Send PROMO
          </button>
        </div>

        <div className="transfer-balance-card-text">
          For more info on sending LIFT CASH{" "}
          <a href="#" className="transfer-balance-card-link">
            click here
          </a>
          . <br />
          <span>You don't have any balance to transfer.</span>
        </div>
      </div> */}
      {/* <div className="transfer-recevie-token-section-main">
        <p className="transfer-recevie-token-section-text">Receive Tokens</p>
        <div className="transfer-recevie-token-section-info">
          For more info{" "}
          <a href="#" className="transfer-recevie-token-section-link">
            click here
          </a>
          .
        </div>
        <p className="transfer-recevie-token-section-username">@shadabquad</p>
      </div> */}

      <div className="bg-white rounded-lg shadow-md mt-6 py-6 w-full max-w-md mx-auto text-center border-2 border-[#64C6F4]">
        <h2 className="text-base text-[#00A1ED] font-medium mb-4">Your current balances:</h2>

        <div className="flex gap-2 px-6 w-full justify-center mb-6">
          <div className="bg-[#DAECFA] rounded-md p-1 w-[46%] ">
            <p className="text-base  font-medium text-[#222222] ">0</p>
            <p className="text-sm text-[#00A1ED] font-semibold">FREEOS</p>
          </div>
          <div className="bg-[#DAECFA] rounded-md  p-1 w-[46%]  font-semibold">
            <p className="text-base  font-medium text-[#222222]">0</p>
            <p className="text-sm text-[#00A1ED] font-semibold">FREEBI</p>
          </div>
        </div>

        <div className="flex justify-around px-6 ">
          <button
            onClick={() => setActiveTab("FREEOS")}
            className={`w-full py-2 text-lg font-medium rounded-t-md border ${
              activeTab === "FREEOS"
                ? " bg-[#CCCCCC] border-blue-500 border-b-0 border-r-0 mt-3 text-gray-800"
                : "text-black py-4 border-2 border-b-0 border-blue-500"
            }`}
          >
            Send FREEOS
          </button>
          <button
            onClick={() => setActiveTab("FREEBI")}
            className={`w-full py-2 text-lg font-medium rounded-t-md border ${
              activeTab === "FREEBI"
                ? " bg-[#CCCCCC] border-blue-500 border-b-0 border-l-0 mt-3 text-gray-800"
                : "text-black py-4 border-2 border-b-0 border-blue-500"
            }`}
          >
            Send FREEBI
          </button>
        </div>
        <div className="h-px bg-gray-800"></div>
        {activeTab==="FREEOS" && <div className="bg-[#00A1ED] ">
          <p className="text-[16px] font-medium text-white p-4">
          FREEBI transfer fee is currently 1.00%
          </p>
        </div> }

        <div className="p-6">
        <p className="text-sm text-gray-800 mb-5">
          For more info on sending FREEOS{" "}
          <a href="#" className="text-[#0000EE] underline">
            click here
          </a>
          .
        </p>
        <p className="text-sm text-gray-800">
          You don't have any balance to transfer.
        </p>
        </div>
      </div>

      <div className="bg-white rounded-lg  mt-6 p-6 w-full max-w-md mx-auto text-center border-2 border-[#64C6F4]">
        <h2 className="text-3xl text-[#222222] font-semibold mb-2">Receive Tokens</h2>
        <p className="text-xs text-gray-800 ">
          For more info{" "}
          <a href="#" className="text-[#0000EE] underline">
            click here
          </a>
          .
        </p>
        <p className="text-2xl  text-[#222222] font-semibold py-6">@vikashvijay</p>
        <button className="border-2 border-[#00A1ED] font-medium text-[#00A1ED] py-2 px-6 rounded-lg w-full hover:bg-blue-100 transition duration-300">
          Need Tokens? Try Alcor
        </button>
      </div>
    </div>
  );
};

export default Transferpage;
