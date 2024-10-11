import "./HeroSection.css";
const HeroSection = () => {
  const HandleLogin = () => {
    console.log("Login Button Clicked");
  };
  return (
    <div className="hero-section-main-div">
      {/* Top Image */}
      <div className="w-full">
        <img
          src="https://images.unsplash.com/photo-1640592276475-56a1c277a38f?q=80&w=3005&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          src="https://images.unsplash.com/photo-1639815189096-f75717eaecfe?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="screenshot"
          className="hero-section-bottom-img"
        />
      </div>
    </div>
  );
};

export default HeroSection;
