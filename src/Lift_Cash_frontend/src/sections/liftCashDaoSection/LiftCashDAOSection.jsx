import "./LiftCashDAOSection.css"; // Import the CSS file

const LiftCashDAOSection = () => {
  return (
    <section className="dao-section" id="dao">
      <div className="dao-content">
        <div className="dao-text">
          <h1 className="dao-title">Lift Cash Economic DAO</h1>
          <p className="dao-description">
            Lift Cash is a Decentralized Autonomous Organization (DAO) that
            provides a decentralized, flexible economic model functioning
            independently when other systems fail. In turbulent times, Lift Cash
            offers a resilient alternative not reliant on central points of
            failure.
          </p>
          <p className="dao-description">
            As a DAO, Lift Cash ensures democratic governance with every
            participant having an equal vote in decision-making. This promotes
            fairness and transparency, allowing the community to manage the
            economic system directly.
          </p>
          <p className="dao-description">
            Lift Cash envisions a diverse, borderless community where
            participants receive a supplementary income governed by a
            democratically controlled fiscal policy. Through a democratic voting
            process on monetary policy, Lift Cash creates an internal community
            currency and marketplace driven by its members' needs and choices.
          </p>
          <p className="dao-description">
            By serving as both a primary and backup economic model, Lift Cash
            empowers users with freedom of choice and fosters competition,
            encouraging improvements in traditional systems while offering a
            robust alternative. Ultimately, Lift Cash enables people to govern
            their economic destiny through cooperative and democratic
            principles.
          </p>
          <button className="dao-button">Know More</button>
        </div>
        <div className="dao-image-container">
          <img
            src="https://freeos.io/assets/about/about-image-02.jpg"
            alt="Lift Cash DAO"
            className="dao-image"
          />
        </div>
      </div>
    </section>
  );
};

export default LiftCashDAOSection;
