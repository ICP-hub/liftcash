// import React from "react";
// import NotVerifiedPage from "../../notVerifiedPage/NotVerifiedPage";

// const MintFreebi = () => {
//   return (
//     <div className="pb-6">
//       <div className="bg-[#00A1ED] text-white text-[16px]  font-medium py-4 flex justify-center items-center">
//         <p className="text-xl text-center font-semibold">
//           Mint <span className="text-[22px] ">POINTS</span> to{" "}
//           <span className="text-[22px] ">FREEBI</span>
//         </p>
//       </div>
//       <p className="text-sm text-gray-800 p-6">
//         FREEBI is our internal trading token within the community and isn't
//         subject to a Mint Fee. The FREEBI tokens exist as a way for participants
//         to have a limited, but tradable, token that can be used for Peer-to-Peer
//         activities, while protecting the FREEOS token's circulating supply. For
//         more info{" "}
//         <a href="#" className="text-[#0000EE] underline">
//           click here
//         </a>
//         .
//       </p>
//       <div className="bg-white border mx-4 my-2 border-blue-400 rounded-lg p-2 mb-4">
//         <h2 className="text-base text-center text-[#00A1ED] font-medium mb-2">
//           Your Current balances:
//         </h2>
//         <div className="flex flex-col items-center">
//           <div className="flex justify-center mb-2 w-full gap-2">
//           <div className="bg-[#DAECFA] w-1/2 flex flex-col justify-center items-center rounded-md text-sm text-[#00A1ED] py-1 font-medium">
//             <p className="text-lg text-gray-800">0</p>
//             <p>POINT</p>
//           </div>
//           <div className="bg-[#DAECFA] w-1/2 flex flex-col justify-center items-center rounded-md text-sm text-[#00A1ED] py-1 font-medium">
//             <p className="text-lg text-gray-800">0</p>
//             <p>FREEBI</p>
//           </div>
//           </div>
//           <div className="bg-[#DAECFA] w-1/2 flex flex-col justify-center items-center rounded-md text-sm text-[#00A1ED] py-1 font-medium">
//             <p className="text-lg text-gray-800">0</p>
//             <p>FREEOS</p>
//           </div>
//         </div>
//       </div>
//       <NotVerifiedPage />
//     </div>
//   );
// };

// export default MintFreebi;


import React from "react";
import NotVerifiedPage from "../../notVerifiedPage/NotVerifiedPage";
import './MintFreebi.css'; 

const MintFreebi = () => {
  return (
    <div className="pb-6">
      <div className="mint-header">
        <p className="mint-header-title">
          Mint <span className="text-[22px]">POINTS</span> to{" "}
          <span className="text-[22px]">FREEBI</span>
        </p>
      </div>

      <p className="mint-info-text">
        FREEBI is our internal trading token within the community and isn't
        subject to a Mint Fee. The FREEBI tokens exist as a way for participants
        to have a limited, but tradable, token that can be used for Peer-to-Peer
        activities, while protecting the FREEOS token's circulating supply. For
        more info{" "}
        <a href="#" className="mint-info-link">click here</a>.
      </p>

      <div className="balances-container">
        <h2 className="balances-title">Your Current balances:</h2>
        <div className="balances-content">
          <div className="flex justify-center mb-2 w-full gap-2">
            <div className="balances-item">
              <p className="balances-item-number">0</p>
              <p>POINT</p>
            </div>
            <div className="balances-item">
              <p className="balances-item-number">0</p>
              <p>FREEBI</p>
            </div>
          </div>
          <div className="balances-item w-1/2">
            <p className="balances-item-number">0</p>
            <p>FREEOS</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mx-4">
      <NotVerifiedPage />
      </div>
      
    </div>
  );
};

export default MintFreebi;
