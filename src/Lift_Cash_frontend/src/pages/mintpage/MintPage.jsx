import DashBoardHead from "../../components/dashboardHead/DashBoardHead";
import MintFreeos from "./mintFreeos/MintFreeos";

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
