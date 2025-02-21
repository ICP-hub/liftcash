import React, { useEffect, useState } from "react";
import { balances, mintOptions } from "../../assets/data/MintTransaction";
import "./MintTransaction.css";
// import getUserPrincipal from "../decideID/DecideID";
import { requestVerification  } from "../decideID/DecideID";
import { toast } from "react-toastify";
// import  {TestBackendComponent} from "../decideID/DecideID";
import { Principal } from "@dfinity/principal";
import { useSelector } from "react-redux";
import { useAuthClient } from "../../utils/useAuthClient";

const useCommunityActor = () => {
  return useSelector((state) => state?.actors?.actors?.communityActor);
};

const useEconomyActor =() => {
  return useSelector((state) => state?.actors?.actors?.economyActor);
}

const MintTransaction = () => {
  const [balance, setBalance] = useState("Select");
  const [amount, setAmount] = useState(0);
  const [mintFee, setMintFee] = useState("Select");
  const [isLoading, setIsLoading]=useState(false);
  const communityActor = useCommunityActor();
  const economyActor = useEconomyActor();
  const [principalText,setPrincipalText]=useState();

  const handleSubmit = async () => {
    setIsLoading(true)
    if (balance === "Select" || amount <= 0 || mintFee === "Select") {
      console.log("Please select  a valid option");
      setIsLoading(false)
    } else {
      const userInput = {
        balanceToMintFrom: balance,
        amountToMint: amount,
        mintFeePaymentMethod: mintFee,
      };
      console.log("User input for transaction:", userInput);
      try {
        console.log(`Amount: ${amount}, Fee %: ${mintFee}`);
        let feePercentage;
        if (mintFee === 'LIFT') { 
          feePercentage = 9.03455;
        } else {
          feePercentage = 13.3456;
        }
        // setFeePercentage(feePercentage);
        console.log(`Amount: ${amount}, Fee %: ${feePercentage}`);
        // setTimeout(() => {
        //   transaction(amount,feePercentage);
        // }, 0);
        await transaction(amount,feePercentage,mintFee);
      } catch (error) {
        console.error("Failed to complete the transaction:", error);
      }finally{
        setIsLoading(false)
      }
    }
  };

  const { principal } = useAuthClient();
  useEffect(() => {
    if (principal) {
      const principalText = principal.toText();
      setPrincipalText(principalText);
      console.log("principal =>", principalText);
    } else {
      console.log("Principal is not available yet.");
    }
  }, [principal]);

  // Use this function to test the Decide ID functionality
  // const testDecideID = async () => {
  //   // convert the string to a Principal object
  //   const verifyPrincipal ="6yj63-v3br4-nfizx-fpw6t-4gq2r-rlxyd-2r3bx-vypil-exu46-tlv7a-yqe";
  //   requestVerification(Principal.fromText(verifyPrincipal));
  //   // requestVerification(verifyPrincipal);
  // };
  // console.log("economyActor",economyActor);
  
  // const fetchBalances = async () => {
  //   try {
  //     const updatedBalance = await economyActor.fetch_unlocked_promo();
  //     const updatedLiftBalance = await economyActor.fetch_lift_token_balance();
  //     const updatedIcpBalance = await economyActor.fetch_icp_balance();
  
  //     setunlockedBalance(updatedBalance);
  //     setLiftBalance(updatedLiftBalance);
  //     setIcpBalance(updatedIcpBalance);
  //   } catch (error) {
  //     console.error("Error fetching balances:", error);
  //   }
  // };

  // useEffect(() => {
  //   const interval = setInterval(fetchBalances, 5000);
  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  const transaction = async (amount, feePercentage,mintFee) => {
    try {
      if (!principalText) {
        // console.error("Principal text is not set.");
        toast.error("Principal is not set. Please log in.");
        return;
      }
    
      if (amount <= 0 || isNaN(amount)) {
        // console.error("Invalid amount. Please check the input.");
        toast.error("Invalid amount");
        return;
      }
    
      if (mintFee === "Select") {
        // console.error("Mint fee not selected.");
        toast.error("Please select a method to pay the mint fee.");
        return;
      }
      // const amountNumber = Number(amount);
      const feeAmount = (amount * feePercentage) / 100;
      const netAmount = amount - feeAmount;
      const scaledNetAmount = Math.floor(netAmount * 1e8);
      // * 1e8
      console.log(`Amount: ${amount}, Fee %: ${feePercentage}, Fee Amount: ${feeAmount}, Net Amount: ${netAmount}`);
      const promos = await economyActor.fetch_unlocked_promo();
      if (amount > promos) {
        toast.error("Insufficient Balance");
        return;
      }
      const response= await  economyActor.mint_token(principalText, scaledNetAmount);
      console.log("response",response)
      if (!response.Ok) {
        toast.error("Transaction failed: " + (response?.error || "Unknown error"));
        return;
      }else{
        console.log(`Successfully minted token.`,response);
        toast.success("Transaction Successful!");
      }
     
        
      if (mintFee === "LIFT") {
        await economyActor.update_lift_token_balance(netAmount);
        console.log("Updated LIFT token balance.");
      } else if (mintFee === "ICP") {
        await economyActor.update_icp_balance(netAmount);
        console.log("Updated ICP token balance.");
      }
    
        // Update current balance after transaction
      await economyActor.update_unlocked_promo(-netAmount);
      await economyActor.update_total_promo(-netAmount);
      console.log("Updated unlocked promo balance.");
        // fetchBalances();
    } catch (error) {
        console.error("Error in transaction:", error);
        toast.error(error.message || "An error occurred during the transaction.");
    }
  };
  
  

  
  const testDecideID = async () => {    
    await requestVerification(Principal.fromText('6zhab-muyfi-4dfm7-fpf5q-gva6j-d7x5c-74dvp-2oimy-5n6qi-osyf3-mqe'),communityActor,principalText);
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
              from account '@{localStorage.getItem("username")}'
            </p>
          </label>

          <input
            type="number"
            className="mint-transaction-option"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="0"
            min="1" 
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
            // onChange={handleFeeChange}
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
        {/* Mint LIFTCASH Button */}
        <div className="mint-transaction-btn-div">
          <button
            className="mint-transaction-submit-btn"
            onClick={handleSubmit}
          >
            Mint LIFT CASH --as
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintTransaction;
