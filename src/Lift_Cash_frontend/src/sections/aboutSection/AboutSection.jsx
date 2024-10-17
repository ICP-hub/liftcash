import "./AboutSection.css";
const AboutSection = () => {
  return (
    <div className="about-section-main-div" id="about">
      {/* Title */}
      <h1 className="about-section-title">What is List Cash?</h1>
      <h2 className="about-section-subtitle">
        A Community-Managed <br />
        Decentralised Economic System
      </h2>
      <p className="about-section-description">
        Govern the monetary policy, weekly, to earn a crypto income.
      </p>

      {/* Cards Section */}
      <div className="about-card-section-main-div">
        {/* How Does it Work Card */}
        <div className="about-section-card-div">
          <h3 className="about-section-card-h3">How Does it Work?</h3>
          <p className="about-section-card-p">
            It works by letting everyone vote in a collective monetary policy to
            earn an income in Lift Cash tokens weekly. This reflects the
            collective will of the community, promoting fairness and
            transparency.
          </p>
        </div>

        {/* Why is it Important Card */}
        <div className="about-section-card-div">
          <h3 className="about-section-card-h3">Why is it Important?</h3>
          <p className="about-section-card-p ">
            This vote is important because the monetary policy is designed to
            support a healthy price of the Lift Cash token—through many
            innovative features and systems that govern supply and demand
            dynamics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
