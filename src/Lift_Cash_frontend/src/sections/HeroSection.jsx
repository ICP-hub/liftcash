const HeroSection = () => {
  const HandleLogin = () => {
    console.log("Login Button Clicked");
  };
  return (
    <div className="bg-blue-500 min-h-screen flex flex-col justify-center items-center text-center">
      {/* Top Image */}
      <div className="w-full">
        <img
          src="https://images.unsplash.com/photo-1640592276475-56a1c277a38f?q=80&w=3005&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Lift Cash Logo"
          className="w-full max-h-72 object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="py-12 text-white px-4">
        <h1 className="text-4xl font-bold">Welcome to Lift Cash</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Lift Cash is an Economic System that gives access to an easily
          accessible, democratic, crypto income for everyone.
        </p>
        <p className="mt-4 text-lg">
          Freeos is managed directly by the people, for the people.
        </p>

        {/* Open App Button */}
        <div className="mt-8">
          <button
            onClick={HandleLogin}
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-md hover:bg-red-600"
          >
            Open App
          </button>
        </div>
      </div>

      {/* Bottom Image */}
      <div className="container flex justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1639815189096-f75717eaecfe?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="screenshot"
          className="w-[60vw] h-[30vh] object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
