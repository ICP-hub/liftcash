// import React from "react";

// const NotVerifiedPage = () => {
//   return (
//     <div className="mx-4">
//       <div className="w-full max-w-md mx-auto  bg-white rounded-lg border border-[#00A1ED] shadow-md text-center">
//         <h2 className="text-3xl p-6 text-center font-medium mb-6">Sorry You are Not Verified</h2>

//         <div className="bg-[#00A1ED] text-center text-white py-4 font-medium text-[22px] mt-2 ">
//         You must be verified to mint <span className="text-[24px]">FREEBI</span>
//         </div>

//         <div className="p-6">
//         <p className="text-xl font-medium mb-4">
//           Verify your account at{" "}
//           <a
//             href="https://identity.metallicus.com"
//             className="text-[#0000EE] underline "
//           >
//             identity.metallicus.com
//           </a>
//         </p>

//         <div className="my-4">
//         <a href="#" className="text-[#0000EE]  underline text-sm">
//           How to verify your account?
//         </a>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotVerifiedPage;

import React from "react";
import "./NotVerifiedPage.css";

const NotVerifiedPage = () => {
  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Sorry You are Not Verified</h2>

        <div className="notice">
          You must be verified to mint{" "}
          <span className="text-[24px]">PROMO</span>
        </div>

        <div className="verify-text">
          <p className="verify-link">
            Verify your account at{" "}
            <a href="https://identity.metallicus.com" className="link">
              identity.metallicus.com
            </a>
          </p>

          <div className="how-to-verify">
            <a href="#" className="link text-sm">
              How to verify your account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotVerifiedPage;
