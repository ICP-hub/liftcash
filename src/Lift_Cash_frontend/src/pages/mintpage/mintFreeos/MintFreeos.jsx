// import React from 'react'

// const MintFreeos = () => {
//   return (
//     <div>
//         <div className="bg-[#00A1ED] text-white text-[16px]  font-medium py-4 flex justify-center items-center">
//             <p className="text-xl text-center font-semibold">
//               This could be a taxable event in your jurisdiction
//             </p>
//           </div>

//           <p className="text-sm text-gray-800 p-6">
//           The Mint Fee applies when you mint your ‘Claimed POINTS’ or FREEBI
//           into a tradable token (FREEOS). For more info{" "}
//           <a href="#" className="text-[#0000EE] underline">
//             click here
//           </a>
//           .
//         </p>

//         <div className="bg-white border mx-4 my-2 border-blue-400 rounded-lg p-2 mb-4">
//           <h2 className="text-base text-center text-[#00A1ED] font-medium mb-2">
//             Your Current balances:
//           </h2>
//           <div className="grid grid-cols-2 gap-2">
//             <div className="bg-[#DAECFA] flex flex-col justify-center items-center rounded-md text-sm text-[#00A1ED] py-1 font-medium">
//               <p className="text-lg text-gray-800">0</p>
//               <p>POINT</p>
//             </div>
//             <div className="bg-[#DAECFA] flex flex-col justify-center items-center rounded-md text-sm text-[#00A1ED] py-1 font-medium">
//               <p className="text-lg text-gray-800">0</p>
//               <p>FREEBI</p>
//             </div>
//             <div className="bg-[#DAECFA] flex flex-col justify-center items-center rounded-md text-sm text-[#00A1ED] py-1 font-medium">
//               <p className="text-lg text-gray-800">0</p>
//               <p>FREEOS</p>
//             </div>
//             <div className="bg-[#DAECFA] flex flex-col justify-center items-center rounded-md text-sm text-[#00A1ED] py-1 font-medium">
//               <p className="text-lg text-gray-800">0</p>
//               <p>XPR</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white border mx-4 m-6 border-blue-400 rounded-lg ">
//           <h3 className="text-base font-medium text-center text-[#00A1ED] pt-2 pb-1">
//             Mint Fee Details:
//           </h3>
//           <p className="text-sm text-center font-medium text-gray-800 mb-2">
//             FREEOS = 9.0588% | XPR = 13.8529% | XUSDC = 14.0441%
//           </p>
//           <div className="bg-[#DAECFA] text-center py-2 rounded-b-lg">
//             <p className="text-sm  text-blue-500 font-bold mb-2">
//               Minimum Mint Fee
//             </p>
//             <p className="text-sm font-semibold text-gray-900">
//               3000 FREEOS
//               <br />
//               or 4139.5982 XPR
//               <br />
//               or 10.20099 XUSDC
//             </p>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default MintFreeos

import React, { useEffect, useState } from "react";
import "./MintFreeos.css";
import MintTransaction from "../../../components/mintTransaction/MintTransaction";
import { useSelector } from "react-redux";

const MintFreeos = () => {
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
    <div>
      <div className="header-bg">
        <p className="text-xl py-2 px-1  text-center font-semibold">
          This could be a taxable event in your jurisdiction
        </p>
      </div>

      <p className="main-text">
        The Mint Fee applies when you mint your ‘Claimed POINTS’ or PROMO into a
        tradable token (LIFT). For more info{" "}
        <a href="#" className="info-link">
          click here
        </a>
        .
      </p>

      <div className="balance-container">
        <h2 className="balance-heading">Your Current balances:</h2>
        <div className="balance-grid">
          <div className="balance-card">
            <p className="balance-text">{userRecord.total_promo} </p>
            <p>PORMO</p>
          </div>
          <div className="balance-card">
            <p className="balance-text">{userRecord.lift_token_balance} </p>
            <p>LIFT</p>
          </div>
          <div className="balance-card   ">
            <p className="balance-text">{userRecord.total_icp || 0} </p>
            <p>ICP</p>
          </div>
          {/* <div className="balance-card   ">
            <p className="balance-text">0</p>
            <p>XUSDC</p>
          </div> */}
        </div>
      </div>

      <div className="fee-container">
        <h3 className="fee-heading">Mint Fee Details:</h3>
        <p className="fee-details">
          LIFT = 9.0588% | ICP = 13.8529% {/*| XUSDC = 14.0441% */}
        </p>
        <div className="mint-fee-section">
          <p className="mint-fee-title">Minimum Mint Fee</p>
          <p className="mint-fee-values">
            3000 LIFT
            <br />
            or 4139.5982 ICP
            {/* <br />
            or 10.20099 XUSDC */}
          </p>
        </div>
      </div>
      <div className="mint-container">
        <MintTransaction />
      </div>
    </div>
  );
};

export default MintFreeos;
