import "./HeroSection.css";
const HeroSection = () => {
  const HandleLogin = () => {
    console.log("Login Button Clicked");
  };
  return (
    <div className="hero-section-main-div">
      {/* Top Image */}
      <div className="hero-section-top-img-div">
        <img
          src="https://freeos.io/assets/hero/banner.png"
          alt="Lift Cash Logo"
          className="hero-section-top-img"
        />
      </div>

      {/* Text Section */}
      <div className="hero-text-section-div">
        <h1 className="hero-text-section-h1">Welcome to Lift Cash</h1>
        <p className="hero-text-section-p">
          Lift Cash is an Economic System that gives access to an easily
          accessible, democratic, crypto income for everyone.
        </p>
        <p className="mt-4 text-lg">
          Freeos is managed directly by the people, for the people.
        </p>

        {/* Open App Button */}
        <div className="mt-8">
          <button onClick={HandleLogin} className="hero-section-login-btn">
            Open App
          </button>
        </div>
      </div>

      {/* Bottom Image */}
      <div className="hero-section-bottom-img-div">
        <img
          src="https://freeos.io/assets/hero/hero-image.jpg"
          alt="screenshot"
          className="hero-section-bottom-img"
        />
      </div>
    </div>
  );
};

export default HeroSection;