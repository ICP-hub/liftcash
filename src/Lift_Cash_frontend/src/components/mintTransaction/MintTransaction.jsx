import React, { useState } from "react";
import { balances, mintOptions } from "../../assets/data/MintTransaction";
import "./MintTransaction.css";

const MintTransaction = () => {
  const [balance, setBalance] = useState("Select");
  const [amount, setAmount] = useState(0);
  const [mintFee, setMintFee] = useState("Select");

  const handleSubmit = () => {
    if (balance === "Select" || amount <= 0 || mintFee === "Select") {
      console.log("Please select  a valid option");
    } else {
      const userInput = {
        balanceToMintFrom: balance,
        amountToMint: amount,
        mintFeePaymentMethod: mintFee,
      };
      console.log(userInput);
    }
  };

  return (
    <div className="mint-transaction-main-div">
      <h2 className="mint-transaction-title">Create a MINT Transaction</h2>
      <div className="mint-transaction-secondary-div">
        {/* Choose a balance to Mint from */}

        <div className="mint-transaction-option-div ">
          <label className=" mint-transaction-lable ">
            1. Choose a balance to Mint from:
          </label>
          <select
            className="mint-transaction-option"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          >
            <option>Select</option>
            {balances.map((balanceOption, index) => (
              <option key={index}>{balanceOption}</option>
            ))}
          </select>
        </div>

        {/* Amount to Mint */}
        <div className="mint-transaction-option-div">
          <label className="mint-transaction-lable ">
            2. Amount to Mint:{" "}
            <p className="mint-transaction-lable-span">
              from account 'shadabquad'
            </p>
          </label>

          <input
            type="number"
            className="mint-transaction-option"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
          />
        </div>

        {/* Pay the Mint Fee with */}
        <div className="mint-transaction-option-div ">
          <label className="mint-transaction-lable ">
            3. Pay the Mint Fee with:
          </label>
          <select
            className="mint-transaction-option"
            value={mintFee}
            onChange={(e) => setMintFee(e.target.value)}
          >
            <option>Select</option>
            {mintOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <hr className="mint-transaction-hr" />
        {/* Mint FREEOS Button */}
        <div className="mint-transaction-btn-div">
          <button
            className="mint-transaction-submit-btn"
            onClick={handleSubmit}
          >
            Mint LIFT CASH
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintTransaction;
