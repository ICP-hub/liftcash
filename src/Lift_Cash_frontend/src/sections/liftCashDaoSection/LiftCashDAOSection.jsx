import "./LiftCashDAOSection.css"; // Import the CSS file

const LiftCashDAOSection = () => {
  return (
    <section className="dao-section" id="dao">
      <div className="dao-content">
        <div className="dao-text">
          <h1 className="dao-title">Lift Cash Economic DAO</h1>
          <p className="dao-description">
            Lift Cash is a decentralised system empowering communities with a
            cooperative currency called LIFT. Here, everyone has a voice in
            shaping the economy to benefit themselves and their neighbours.
          </p>
          <p className="dao-description">
            Every week, participants vote on monetary policy, directly affecting
            the value and distribution of LIFT tokens. This system thrives
            alongside traditional finance, even in tough times.
          </p>
          <p className="dao-description">
            Lift Cash stands for cooperation, democracy, and meritocracy. No
            intermediaries—just peer-to-peer connections. Earn based on your
            contributions. Everyone has a say in decisions, ensuring fairness
            and equality.
          </p>
          <p className="dao-description">
            Our community-first approach attracts local organisers,
            cooperatives, DAOs, and advocates for freedom. Lift Cash promotes
            cooperation and offers an inclusive platform for all.
          </p>
          <p className="dao-description">
            Using game theory, Lift Cash aligns personal incentives with group
            success. This creates a thriving economy where everyone benefits
            from each other's success.
          </p>
          <p className="dao-description">
            Blockchain technology ensures transparency and security. The
            one-person-one-vote model gives everyone control over economic
            policies. It's a cooperative ecosystem that benefits individuals and
            the community.
          </p>
          <p className="dao-description">
            Join the revolution! Visit{" "}
            <a
              className="text-[#67E8F9] font-semibold"
              href="https://liftcash.com"
            >
              www.lift.cash
            </a>{" "}
            to see how Lift Cash can lift you AND your community!
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
