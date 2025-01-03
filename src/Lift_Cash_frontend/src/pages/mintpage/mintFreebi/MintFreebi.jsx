import React from "react";
import NotVerifiedPage from "../../notVerifiedPage/NotVerifiedPage";
import "./MintFreebi.css";

const MintFreebi = () => {
  return (
    <div className="pb-6">
      <div className="mint-header">
        <p className="mint-header-title">
          Mint <span className="text-[22px]">POINTS</span> to{" "}
          <span className="text-[22px]">PROMO</span>
        </p>
      </div>

      <p className="mint-info-text">
        PROMO is our internal trading token within the community and isn't
        subject to a Mint Fee. The PROMO tokens exist as a way for participants
        to have a limited, but tradable, token that can be used for Peer-to-Peer
        activities, while protecting the LIFT token's circulating supply. For
        more info{" "}
        <a href="#" className="mint-info-link">
          click here
        </a>
        .
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
              <p>PROMO</p>
            </div>
          </div>
          <div className="balances-item w-1/2 ">
            <p className="balances-item-number">0</p>
            <p>LIFT</p>
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
