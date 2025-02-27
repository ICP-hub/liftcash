import React, { useEffect, useState } from "react";
import "./MintFreeos.css";
import MintTransaction from "../../../components/mintTransaction/MintTransaction";
import { useSelector } from "react-redux";

const MintFreeos = () => {
  const [userRecord, setUserRecord] = useState({
    total_promo: 0.0,
    lift_token_balance: 0.0,
    icp_balance:0.0
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
  }, [economyActor,userRecord]);

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
            <p className="balance-text">{userRecord.unlocked_promo} </p>
            <p>PROMO</p>
          </div>
          <div className="balance-card">
            <p className="balance-text">{userRecord.lift_token_balance} </p>
            <p>LIFT</p>
          </div>
          <div className="balance-card   ">
            <p className="balance-text">{userRecord.icp_balance || 0} </p>
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
