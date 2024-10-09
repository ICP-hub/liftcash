const AboutSection = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-4">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-2 text-blue-400">
        What is List Cash?
      </h1>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        A Community-Managed <br />
        Decentralised Economic System
      </h2>
      <p className="text-yellow-400 text-center mb-12">
        Govern the monetary policy, weekly, to earn a crypto income.
      </p>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* How Does it Work Card */}
        <div className="bg-red-500  p-6 rounded-lg md:h-[40vh]">
          <h3 className="text-3xl font-semibold m-4">How Does it Work?</h3>
          <p className="m-4 font-semibold">
            It works by letting everyone vote in a collective monetary policy to
            earn an income in Lift Cash tokens weekly. This reflects the
            collective will of the community, promoting fairness and
            transparency.
          </p>
        </div>

        {/* Why is it Important Card */}
        <div className="bg-red-500  p-6 rounded-lg  md:h-[40vh]">
          <h3 className="text-3xl font-semibold m-4">Why is it Important?</h3>
          <p className="m-4 font-semibold ">
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
