import React from "react";

const CongratsModal = ({ setIsOpen, reward }) => {
  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-blue-400 bg-opacity-50 z-50">
      <div className="relative bg-white rounded-xl shadow-xl p-8 w-[400px] h-[300px] sm:w-[500px] text-center">
        <button
          className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-3xl"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>
        <div className="relative mx-auto mb-6">
          <div className="w-24 h-24 bg-blue-500 ml-[35%] rounded-full flex justify-center items-center relative">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex justify-center items-center">
              <div className="w-14 h-14 bg-white rounded-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-10 h-10 text-blue-500"
                >
                  <path d="M12 2.25l1.76 4.37 4.64.37-3.5 3.01 1.12 4.5L12 12.88l-4.02 2.62 1.12-4.5-3.5-3.01 4.64-.37L12 2.25z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-8 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
        <div className="absolute top-2 left-12 w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div className="absolute top-8 left-20 text-blue-500 text-xl font-bold">
          *
        </div>

        <div className="absolute top-6 right-10 w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        <div className="absolute top-4 right-12 w-2 h-2 bg-purple-500 rounded-full"></div>

        <div className="absolute bottom-12 left-10 w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
        <div className="absolute bottom-14 left-6 w-2 h-2 bg-pink-400 rounded-full"></div>

        <div className="absolute bottom-8 right-8 w-3 h-3 bg-blue-400 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>

        <h2 className="text-2xl font-bold text-blue-700 mt-4">
          Congratulations
        </h2>
        <p className="text-gray-600 mt-2">
          {`Awesome! 🎉 You’ve been rewarded with ${reward} PROMO 😊`}
        </p>
      </div>
    </div>
  );
};

export default CongratsModal;
