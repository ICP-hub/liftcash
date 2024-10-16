import "./TransferPage.css";
import DashBoardHead from "../../components/dashboardHead/DashBoardHead";

const Transferpage = () => {
  return (
    <div className="transfer-main-section">
      {/* Header Section */}
      <DashBoardHead />

      {/* Balance Card */}
      <div className="transfer-balance-card-section-main ">
        <p className="transfer-balance-card-section-amount">
          Your current balances: $ 34
        </p>
        <div className="transfer-balance-card-section-tokens">
          <div className="transfer-balance-card-section-present-tokens">
            0 LIFT CASH
          </div>
          <div className="transfer-balance-card-section-present-tokens">
            0 PROMO
          </div>
        </div>

        <div className="transfer-balance-card-send-section-main">
          <button className="transfer-balance-card-send-section-btn">
            Send LIFT CASH
          </button>
          <button className="transfer-balance-card-send-section-btn">
            Send PROMO
          </button>
        </div>

        <div className="transfer-balance-card-text">
          For more info on sending LIFT CASH{" "}
          <a href="#" className="transfer-balance-card-link">
            click here
          </a>
          . <br />
          <span>You don't have any balance to transfer.</span>
        </div>
      </div>

      {/* Receive Tokens Section */}
      <div className="transfer-recevie-token-section-main">
        <p className="transfer-recevie-token-section-text">Receive Tokens</p>
        <div className="transfer-recevie-token-section-info">
          For more info{" "}
          <a href="#" className="transfer-recevie-token-section-link">
            click here
          </a>
          .
        </div>
        <p className="transfer-recevie-token-section-username">@shadabquad</p>
      </div>
    </div>
  );
};

export default Transferpage;
