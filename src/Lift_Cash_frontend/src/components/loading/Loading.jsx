import React from "react";
import { MutatingDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center h-screen w-full bg-white items-center">
      <div className="spinner">
        <MutatingDots
          visible={true}
          height="150"
          width="150"
          color="#00A1ED"
          //   secondaryColor="#4fa94d"
          radius="15"
          ariaLabel="mutating-dots-loading"
          //   wrapperStyle={{}}
          //   wrapperClass=""
        />
      </div>
      <div className="text-xl font-semibold">Loading...</div>
    </div>
  );
};

export default Loading;
