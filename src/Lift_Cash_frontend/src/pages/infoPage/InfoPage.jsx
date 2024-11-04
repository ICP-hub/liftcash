import "./InfoPage.css";
import bgimg from "../../assets/images/background.svg";

const InfoPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        //  backgroundAttachment: "fixed"
      }}
      className="info-main-div"
    >
      <div className="info-secondary-div">
        <div className="info-card-top-div">
          <h1 className="info-card-title">Lift Cash</h1>
          <p className="info-card-sub-title">
            Empowering Communities with Cooperative Currency
          </p>
        </div>
        <div className="info-card-ques-ans-section">
          <h2 className="info-card-ques">What is Lift Cash?</h2>
          <p className="info-card-ans">
            Lift Cash is a decentralized platform where communities control
            their monetary policies. With a cooperative currency called LIFT,
            participants vote weekly, aligning incentives with group success
            through blockchain technology.
          </p>
          <div className="info-feature">
            <h3 className="info-feature-title">Key Features:</h3>
            <ul className="info-feature-ul">
              <li>Decentralized decision-making</li>
              <li>Blockchain transparency</li>
              <li>Community-driven monetary policy</li>
            </ul>
          </div>

          <a href="https://lift.cash" className="info-link">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
