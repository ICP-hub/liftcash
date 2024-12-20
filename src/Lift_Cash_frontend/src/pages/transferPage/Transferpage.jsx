// // import "./TransferPage.css";
// // import DashBoardHead from "../../components/dashboardHead/DashBoardHead";
// // import React, { useState } from "react";

// // const Transferpage = () => {
// //   const [activeTab, setActiveTab] = useState("FREEOS");
// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 flex flex-col items-center p-5">
// //       <DashBoardHead />

// //       <div className="bg-white rounded-lg shadow-md mt-6 py-6 w-full max-w-md mx-auto text-center border-2 border-[#64C6F4]">
// //         <h2 className="text-base text-[#00A1ED] font-medium mb-4">Your current balances:</h2>

// //         <div className="flex gap-2 px-6 w-full justify-center mb-6">
// //           <div className="bg-[#DAECFA] rounded-md p-1 w-[46%] ">
// //             <p className="text-base  font-medium text-[#222222] ">0</p>
// //             <p className="text-sm text-[#00A1ED] font-semibold">FREEOS</p>
// //           </div>
// //           <div className="bg-[#DAECFA] rounded-md  p-1 w-[46%]  font-semibold">
// //             <p className="text-base  font-medium text-[#222222]">0</p>
// //             <p className="text-sm text-[#00A1ED] font-semibold">FREEBI</p>
// //           </div>
// //         </div>

// //         <div className="flex justify-around px-6 ">
// //           <button
// //             onClick={() => setActiveTab("FREEOS")}
// //             className={`w-full py-2 text-lg font-medium rounded-t-md border ${
// //               activeTab === "FREEOS"
// //                 ? " bg-[#CCCCCC] border-blue-500 border-b-0 border-r-0 mt-3 text-gray-800"
// //                 : "text-black py-4 border-2 border-b-0 border-blue-500"
// //             }`}
// //           >
// //             Send FREEOS
// //           </button>
// //           <button
// //             onClick={() => setActiveTab("FREEBI")}
// //             className={`w-full py-2 text-lg font-medium rounded-t-md border ${
// //               activeTab === "FREEBI"
// //                 ? " bg-[#CCCCCC] border-blue-500 border-b-0 border-l-0 mt-3 text-gray-800"
// //                 : "text-black py-4 border-2 border-b-0 border-blue-500"
// //             }`}
// //           >
// //             Send FREEBI
// //           </button>
// //         </div>
// //         <div className="h-px bg-gray-800"></div>
// //         {activeTab==="FREEOS" && <div className="bg-[#00A1ED] ">
// //           <p className="text-[16px] font-medium text-white p-4">
// //           FREEBI transfer fee is currently 1.00%
// //           </p>
// //         </div> }

// //         <div className="p-6">
// //         <p className="text-sm text-gray-800 mb-5">
// //           For more info on sending FREEOS{" "}
// //           <a href="#" className="text-[#0000EE] underline">
// //             click here
// //           </a>
// //           .
// //         </p>
// //         <p className="text-sm text-gray-800">
// //           You don't have any balance to transfer.
// //         </p>
// //         </div>
// //       </div>

// //       <div className="bg-white rounded-lg  mt-6 p-6 w-full max-w-md mx-auto text-center border-2 border-[#64C6F4]">
// //         <h2 className="text-3xl text-[#222222] font-semibold mb-2">Receive Tokens</h2>
// //         <p className="text-xs text-gray-800 ">
// //           For more info{" "}
// //           <a href="#" className="text-[#0000EE] underline">
// //             click here
// //           </a>
// //           .
// //         </p>
// //         <p className="text-2xl  text-[#222222] font-semibold py-6">@vikashvijay</p>
// //         <button className="border-2 border-[#00A1ED] font-medium text-[#00A1ED] py-2 px-6 rounded-lg w-full hover:bg-blue-100 transition duration-300">
// //           Need Tokens? Try Alcor
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Transferpage;

import "./TransferPage.css";
import DashBoardHead from "../../components/dashboardHead/DashBoardHead";
// import React, { useState } from "react";
import bgimg from "../../assets/images/background.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Transferpage = () => {
  const [userRecord, setUserRecord] = useState({
    total_promo: 0.0,
    lift_token_balance: 0.0,
  });

  const economyActor = useSelector(
    (state) => state?.actors?.actors?.economyActor
  );

  const fetchUserRecords = async () => {
    try {
      const res = await economyActor.fetch_user_record();
      console.log("User Records:", res);
      setUserRecord(res);
    } catch (error) {
      console.log("Error fetching user records: ", error);
    }
  };

  useEffect(() => {
    console.log("economyActor in transfer page:", economyActor);
    fetchUserRecords();
  }, [economyActor]);

  return (
    <div className="page-container">
      <DashBoardHead className="border-red-900" />

      <div className="card-container ">
        <h2 className="balance-title">Your current balances:</h2>

        <div className="balanceContainer">
          <div className="balance-item">
            <p className="balance-amount">{userRecord.lift_token_balance} </p>
            <p className="balance-label">LIFT</p>
          </div>
          <div className="balance-item">
            <p className="balance-amount">{userRecord.total_promo} </p>
            <p className="balance-label">PROMO</p>
          </div>
        </div>

        {/* <div className="tabs-container">
          <button
            onClick={() => setActiveTab("LIFT")}
            className={`tab-button ${
              activeTab === "LIFT" ? "active-tab" : "inactive-tab"
            }`}
          >
            Send LIFT
          </button>
          <button
            onClick={() => setActiveTab("PROMO")}
            className={`tab-button ${
              activeTab === "PROMO" ? "active-tab" : "inactive-tab"
            }`}
          >
            Send PROMO
          </button>
        </div> */}

        <div className="transfer-fee">
          <p className="transfer-fee-text">
            <span className="text-base">PROMO </span>transfer fee is currently
            1.00%
          </p>
        </div>

        <div className="info-section">
          <p className="info-text">
            For more info on sending LIFT{" "}
            <a
              href="#"
              className="text-blue-violet
             underline"
            >
              click here
            </a>
            .
          </p>
          <p className="balance-info">
            You don't have any balance to transfer.
          </p>
        </div>
      </div>

      <div className="receive-tokens-container ">
        <h2 className="receive-title">Receive Tokens</h2>
        <p className="receive-info-text">
          For more info{" "}
          <a href="#" className="text-blue-violet underline">
            click here
          </a>
          .
        </p>
        <p className="receive-username">@{localStorage.getItem("username")}</p>
        <button className="need-tokens-button">Need Tokens? </button>
      </div>
    </div>
  );
};

export default Transferpage;
