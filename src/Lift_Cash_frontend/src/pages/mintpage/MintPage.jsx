// import React, { useState } from "react";
// import DashBoardHead from "../../components/dashboardHead/DashBoardHead";
// import MintFreebi from "./mintFreebi/MintFreebi";
// import MintFreeos from "./mintFreeos/MintFreeos";

// const MintPage = () => {
//   const [activeTab, setActiveTab] = useState("FREEOS");

//   return (
//     <div className="min-h-screen bg-gradient-to-b pb-8 from-blue-200 to-blue-500  flex flex-col items-center">
//       <DashBoardHead />
//       <div className="mt-6 pt-2 w-full  max-w-md mx-auto  bg-white rounded-lg  border-2 border-[#00A1ED] ">
//         <h1 className="text-3xl font-semibold p-4 text-[#222222] mb-4 text-center">
//           Mint
//         </h1>

//         <div className="flex justify-around px-6 ">
//           <button
//             onClick={() => setActiveTab("FREEOS")}
//             className={`w-full py-2 text-xl font-medium rounded-t-md border ${
//               activeTab === "FREEOS"
//                 ? " bg-[#CCCCCC] border-blue-500 border-b-0 border-r-0 mt-3 text-gray-800"
//                 : "text-black py-4 border-2 border-b-0 border-blue-500"
//             }`}
//           >
//             Mint FREEOS
//           </button>
//           <button
//             onClick={() => setActiveTab("FREEBI")}
//             className={`w-full py-2 text-xl font-medium rounded-t-md border ${
//               activeTab === "FREEBI"
//                 ? " bg-[#CCCCCC] border-blue-500 border-b-0 border-l-0 mt-3 text-gray-800"
//                 : "text-black py-4 border-2 border-b-0 border-blue-500"
//             }`}
//           >
//             Mint FREEBI
//           </button>
//         </div>
//         <div className="h-px bg-black "></div>
//         {activeTab === "FREEOS" ? <MintFreeos /> : <MintFreebi />}
//       </div>
//     </div>
//   );
// };

// export default MintPage;

import React, { useState } from "react";
import DashBoardHead from "../../components/dashboardHead/DashBoardHead";
// import MintFreebi from "./mintFreebi/MintFreebi";
import MintFreeos from "./mintFreeos/MintFreeos";
import "./MintPage.css";

// const MintPage = () => {
//   const [activeTab, setActiveTab] = useState("FREEOS");

//   return (
//     <div className="page-container">
//       <DashBoardHead />
//       <div className="card-container">
//         <h1 className="heading-title">Mint</h1>

//         <div className="tabs-container">
//           <button
//             onClick={() => setActiveTab("FREEOS")}
//             className={`tab-button ${
//               activeTab === "FREEOS" ? "active-tab" : "inactive-tab"
//             }`}
//           >
//             Mint LIFT
//           </button>
//           <button
//             onClick={() => setActiveTab("FREEBI")}
//             className={`tab-button ${
//               activeTab === "FREEBI" ? "active-tab" : "inactive-tab"
//             }`}
//           >
//             Mint PROMO
//           </button>
//         </div>
//         <div className="divider"></div>

//         {activeTab === "FREEOS" ? <MintFreeos /> : <MintFreebi />}
//       </div>
//     </div>
//   );
// };

// export default MintPage;

// import React, { useState } from "react";
// import DashBoardHead from "../../components/dashboardHead/DashBoardHead";
// import MintFreebi from "./mintFreebi/MintFreebi";
// import MintFreeos from "./mintFreeos/MintFreeos";

// const MintPage = () => {
//   const [activeTab, setActiveTab] = useState("FREEOS");

//   return (
//     <div className="min-h-screen bg-gradient-to-b pb-8 from-blue-200 to-blue-500  flex flex-col items-center">
//       <DashBoardHead />
//       <div className="mt-6 pt-2 w-full  max-w-md mx-auto  bg-white rounded-lg  border-2 border-[#00A1ED] ">
//         <h1 className="text-3xl font-semibold p-4 text-[#222222] mb-4 text-center">
//           Mint
//         </h1>

//         <div className="flex justify-around px-6 ">
//           <button
//             onClick={() => setActiveTab("FREEOS")}
//             className={`w-full py-2 text-xl font-medium rounded-t-md border ${
//               activeTab === "FREEOS"
//                 ? " bg-[#CCCCCC] border-blue-500 border-b-0 border-r-0 mt-3 text-gray-800"
//                 : "text-black py-4 border-2 border-b-0 border-blue-500"
//             }`}
//           >
//             Mint FREEOS
//           </button>
//           <button
//             onClick={() => setActiveTab("FREEBI")}
//             className={`w-full py-2 text-xl font-medium rounded-t-md border ${
//               activeTab === "FREEBI"
//                 ? " bg-[#CCCCCC] border-blue-500 border-b-0 border-l-0 mt-3 text-gray-800"
//                 : "text-black py-4 border-2 border-b-0 border-blue-500"
//             }`}
//           >
//             Mint FREEBI
//           </button>
//         </div>
//         <div className="h-px bg-black "></div>
//         {activeTab === "FREEOS" ? <MintFreeos /> : <MintFreebi />}
//       </div>
//     </div>
//   );
// };

// export default MintPage;

const MintPage = () => {
  return (
    <div className="page-container">
      <DashBoardHead />
      <div className="card-container">
        <h1 className="heading-title">Mint</h1>
        <MintFreeos />
      </div>
    </div>
  );
};

export default MintPage;
