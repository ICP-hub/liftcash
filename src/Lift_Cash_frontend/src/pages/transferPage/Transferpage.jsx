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
